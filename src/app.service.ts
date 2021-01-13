import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invitation } from './invitation/entity/invitation.entity';
import { Role } from './role/entity/role.entity';
import * as fs from 'fs';
import { resolve } from 'path';
import { AddRoleDto } from './role/dto/add-role.dto';
import { AddInvitationDto } from './invitation/dto/add-invitation.dto';
import { AddNewUserDto } from './database-init/user/add-new-user.dto';
import { AuthService } from './auth/auth.service';
import { User } from './user/entity/user.entity';
import { RegisterNewUserDto } from './auth/dto/register-new-user.dto';
import { UserInvitation } from './user-invitation/entity/user-invitation.entity';

export interface InsertDataResult {
  created: boolean;
  onError: boolean;
}
export interface RoleInitMandatoryDataResult extends InsertDataResult {
  roleCode: string;
}
export interface InvitationInitMandatoryDataResult extends InsertDataResult {
  invitationCode: string;
}
export interface AdminMandatoryDataResult extends InsertDataResult {
  username: string;
  userRoleLink: RoleInitMandatoryDataResult;
  userInvitationLink: InvitationInitMandatoryDataResult[];
}

export interface GlobalMandatoryDataResult {
  role: RoleInitMandatoryDataResult[];
  invitation: InvitationInitMandatoryDataResult[];
  admin: AdminMandatoryDataResult[];
}

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(Invitation)
    private readonly invitationRepository: Repository<Invitation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserInvitation)
    private readonly userInvitationRepository: Repository<UserInvitation>,
    private readonly authService: AuthService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async initMandatotyData(): Promise<GlobalMandatoryDataResult> {
    const roleResult = await this.initRoleData(
      './database-init/mandatory/role.init.json',
    );
    const invitationResult = await this.initInvitationData(
      './database-init/mandatory/invitation.init.json',
    );
    const adminResult = await this.initNewUserData(
      './database-init/mandatory/user.init.json',
    );

    return {
      role: roleResult,
      invitation: invitationResult,
      admin: adminResult,
    };
  }

  private async initRoleData(
    jsonInitFilePath: string,
  ): Promise<RoleInitMandatoryDataResult[]> {
    const initialRole = this.readJsonInitValue<AddRoleDto[]>(jsonInitFilePath);

    const resultInit: RoleInitMandatoryDataResult[] = [];

    for (const role of initialRole) {
      try {
        const numberCount = await this.roleRepository.count({
          where: {
            code: role.code,
          },
        });

        if (numberCount === 0) {
          const newRole = await this.roleRepository.save(role);
          resultInit.push({
            roleCode: newRole.code,
            created: true,
            onError: false,
          });
        } else {
          resultInit.push({
            roleCode: role.code,
            created: false,
            onError: false,
          });
        }
      } catch (error) {
        resultInit.push({
          roleCode: role.code,
          created: false,
          onError: true,
        });
      }
    }

    return resultInit;
  }

  private async initInvitationData(
    jsonInitFilePath: string,
  ): Promise<InvitationInitMandatoryDataResult[]> {
    const initialInvitations = this.readJsonInitValue<AddInvitationDto[]>(
      jsonInitFilePath,
    );

    const resultInit: InvitationInitMandatoryDataResult[] = [];

    for (const invitation of initialInvitations) {
      try {
        const numberCount = await this.invitationRepository.count({
          where: {
            code: invitation.code,
          },
        });

        if (numberCount === 0) {
          const newRole = await this.invitationRepository.save(invitation);
          resultInit.push({
            invitationCode: newRole.code,
            created: true,
            onError: false,
          });
        } else {
          resultInit.push({
            invitationCode: invitation.code,
            created: false,
            onError: false,
          });
        }
      } catch (error) {
        resultInit.push({
          invitationCode: invitation.code,
          created: false,
          onError: true,
        });
      }
    }

    return resultInit;
  }

  private async initNewUserData(
    jsonInitFilePath: string,
  ): Promise<AdminMandatoryDataResult[]> {
    const initialUsers = this.readJsonInitValue<AddNewUserDto[]>(
      jsonInitFilePath,
    );

    const resultInit: AdminMandatoryDataResult[] = [];

    for (const initUser of initialUsers) {
      try {
        const numberCount = await this.userRepository.count({
          where: {
            username: initUser.username,
          },
        });

        const result: AdminMandatoryDataResult = {
          username: initUser.username,
          created: false,
          onError: true,
          userInvitationLink: [],
          userRoleLink: null,
        };

        //INSERT NEW USER
        if (numberCount === 0) {
          const registerNewUser: RegisterNewUserDto = {
            firstName: initUser.firstname,
            lastName: initUser.lastname,
            password: initUser.password,
            username: initUser.username,
          };
          const newUserId = await this.authService.register(registerNewUser);
          if (newUserId) {
            result.created = true;
          } else {
            result.created = false;
          }
        } else {
          result.created = false;
        }

        const newUser: User = await this.userRepository.findOneOrFail({
          where: {
            username: initUser.username,
          },
        });

        // LINK ROLE TO USER
        const role: Role = await this.roleRepository.findOneOrFail({
          where: {
            code: initUser.role,
          },
        });
        newUser.role = role;
        const updatedUser = await this.userRepository.save(newUser);
        if (updatedUser) {
          result.userRoleLink = {
            roleCode: role.code,
            created: true,
            onError: false,
          };
        } else {
          result.userRoleLink = {
            roleCode: role.code,
            created: false,
            onError: true,
          };
        }

        // LINK INVITATION TO USER
        const qb = this.invitationRepository
          .createQueryBuilder('invitation')
          .where('invitation.code IN (:invit)', {
            invit: initUser.invitations,
          });

        const invitations: Invitation[] = await qb.getMany();

        for (const inv of invitations) {
          const existUserInv: number = await this.userInvitationRepository.count(
            {
              where: {
                user: updatedUser,
                invitation: inv,
              },
            },
          );

          if (existUserInv === 0) {
            const userInvitation = await this.userInvitationRepository.insert({
              answer: null,
              invitation: inv,
              user: updatedUser,
            });

            if (userInvitation) {
              result.userInvitationLink.push({
                created: true,
                onError: false,
                invitationCode: inv.code,
              });
            } else {
              result.userInvitationLink.push({
                created: false,
                onError: true,
                invitationCode: inv.code,
              });
            }
          } else {
            result.userInvitationLink.push({
              created: false,
              onError: false,
              invitationCode: inv.code,
            });
          }
        }

        resultInit.push(result);
      } catch (error) {
        resultInit.push({
          username: initUser.username,
          userRoleLink: null,
          userInvitationLink: null,
          created: false,
          onError: true,
        });
      }
    }

    return resultInit;
  }

  private readJsonInitValue<T>(jsonPath: string): T {
    const fileContent = fs.readFileSync(resolve(__dirname, jsonPath), 'utf8');
    const jsonData: T = JSON.parse(fileContent);

    return jsonData;
  }
}
