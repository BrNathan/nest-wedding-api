import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/decorator/roles.decorator';
import { UserJwt } from 'src/decorator/user-jwt.decorator';
import { UserJwtPayload } from 'src/interfaces/jwt-payload.interface';
import { ERole } from 'src/keys';
import { GetMinimalUserInfo } from 'src/user-invitation/dto/get-minimal-user-info.dto';
import { AddUserDto } from './dto/add-user.dto';
import { CompleteUser } from './dto/complete-user.dto';
import { EmailChecked } from './dto/email-checked.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(ERole.ADMIN, ERole.INVITE)
  @Post('available-email')
  async checkAvailabilityEmail(
    @Body() emailChecked: EmailChecked,
    @UserJwt() userInfo: UserJwtPayload,
  ): Promise<{ available: boolean }> {
    const isAvailable: boolean = await this.userService.isEmailAvailable(
      emailChecked.email,
    );
    return { available: isAvailable };
  }

  @Roles(ERole.ADMIN, ERole.INVITE)
  @Put('complete/:userId')
  async completeUserInfoById(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() newUser: CompleteUser,
    @UserJwt() userInfo: UserJwtPayload,
  ): Promise<{ count: number }> {
    if (userInfo.id !== userId && userInfo.userRole !== ERole.ADMIN) {
      throw new ForbiddenException("You don't have access to this ressource");
    }
    const user = await this.userService.completeUserInfo(userId, newUser);

    return { count: user ? 1 : 0 };
  }

  @Roles(ERole.ADMIN, ERole.INVITE)
  @Get('minimal/:userId')
  async getMinimalUserInfoById(
    @Param('userId', ParseIntPipe) userId: number,
    @UserJwt() userInfo: UserJwtPayload,
  ): Promise<GetMinimalUserInfo> {
    if (userInfo.id !== userId && userInfo.userRole !== ERole.ADMIN) {
      throw new ForbiddenException("You don't have access to this ressource");
    }
    const user: User = await this.userService.findById(userId);
    return {
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
    };
  }

  @Roles(ERole.ADMIN)
  @Post()
  async create(@Body() newUser: AddUserDto): Promise<User> {
    return await this.userService.create(newUser);
  }

  @Roles(ERole.ADMIN)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Roles(ERole.ADMIN)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.userService.findById(id);
  }

  @Roles(ERole.ADMIN)
  @Put(':id')
  async updateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: Partial<AddUserDto>,
  ): Promise<void> {
    await this.userService.updateById(id, newUser);
  }

  @Roles(ERole.ADMIN)
  @Delete(':id')
  async deleteById(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.deleteById(id);
  }
}
