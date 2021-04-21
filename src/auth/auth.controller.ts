import {
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { UserJwt } from 'src/decorator/user-jwt.decorator';
import { AuthToken } from 'src/interfaces/auth-token.interface';
import { UserJwtPayload } from 'src/interfaces/jwt-payload.interface';
import { ERole } from 'src/keys';
import { ChangePassword } from 'src/user/dto/change-password.dto';
import { User } from 'src/user/entity/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // @Post()
  // async register(
  //   @Body() registerNewUserData: RegisterNewUserDto,
  // ): Promise<number> {
  //   return await this.authService.register(registerNewUserData);
  // }

  @Public()
  @Post('login')
  async login(@Body() credentials: CredentialsDto): Promise<AuthToken> {
    const user: User = await this.authService.verifyCredentials(credentials);

    const token: string = await this.authService.generateToken(user);
    return { token: token };
  }

  @Roles(ERole.ADMIN, ERole.INVITE)
  @Get('refresh-token')
  async refreshToken(@UserJwt() userInfo: UserJwtPayload): Promise<AuthToken> {
    const user: User = await this.userService.findById(userInfo.id);

    if (user === null) {
      throw new UnauthorizedException('user not find');
    }

    const token: string = await this.authService.generateToken(user);

    return { token: token };
  }

  @Public()
  @Post('forget-password')
  async forgetPassword(
    @Body() changePasswordData: ChangePassword,
  ): Promise<{ username: string; result: boolean }> {
    const result: boolean = await this.userService.changePassword(
      changePasswordData.username,
      changePasswordData.newPassword,
    );

    return { username: changePasswordData.username, result: result };
  }
}
