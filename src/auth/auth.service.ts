import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { RegisterNewUserDto } from './dto/register-new-user.dto';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { UserJwtPayload } from 'src/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(newUserData: RegisterNewUserDto): Promise<number> {
    const newUser = this.userRepository.create(newUserData);
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await bcrypt.hash(newUser.password, newUser.salt);

    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      throw new ConflictException(error);
    }

    return newUser.id;
  }

  async verifyCredentials(credentials: CredentialsDto): Promise<User> {
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :usernameOrEmail', {
        usernameOrEmail: credentials.emailOrUsername,
      })
      .orWhere('user.username = :usernameOrEmail', {
        usernameOrEmail: credentials.emailOrUsername,
      });

    let foundUser: User = await queryBuilder.getOne();

    if (!foundUser) {
      throw new NotFoundException(
        `User ${credentials.emailOrUsername} not found.`,
      );
    }

    const requestedHashedPassword = await bcrypt.hash(
      credentials.password,
      foundUser.salt,
    );

    if (requestedHashedPassword !== foundUser.password) {
      throw new NotFoundException(
        `User ${credentials.emailOrUsername} not found.`,
      );
    }

    foundUser = await this.userRepository.findOneOrFail({
      where: {
        id: foundUser.id,
      },
    });

    return foundUser;
  }

  async generateToken(user: User): Promise<string> {
    const payload: UserJwtPayload = {
      id: user?.id,
      username: user?.username,
      email: user?.email,
      userRole: user?.role?.code,
      userInvitations: user?.userInvitations?.map((ui) => ui?.invitation?.code),
      isAlreadyConnected: user?.isAlreadyConnected,
      firstName: user?.firstName,
      lastName: user?.lastName,
    };
    const jwt: string = await this.jwtService.signAsync(payload);
    return jwt;
  }
}
