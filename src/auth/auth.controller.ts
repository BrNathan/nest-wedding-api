import { Body, Controller, Post } from '@nestjs/common';
import { userInfo } from 'os';
import { Public } from 'src/decorator/public.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { UserJwt } from 'src/decorator/user-jwt.decorator';
import { AuthToken } from 'src/interfaces/auth-token.interface';
import { Role } from 'src/keys';
import { User } from 'src/user/entity/user.entity';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { RegisterNewUserDto } from './dto/register-new-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Roles(Role.ADMIN)
  @Post('refreshToken')
  async refreshToken(@UserJwt() userInfo): Promise<AuthToken> {
    //const user: User =
    // const token: string = await this.authService.generateToken(user);
    return { token: 'TODO TOKEN' };
  }
}
