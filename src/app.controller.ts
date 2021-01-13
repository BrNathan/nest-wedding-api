import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService, GlobalMandatoryDataResult } from './app.service';
import { Public } from './decorator/public.decorator';
import { Roles } from './decorator/roles.decorator';
import { EnvironmentKey, ERole } from './keys';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Public()
  @Get()
  config(): any {
    return {
      hello: this.appService.getHello(),
      env: this.configService.get(EnvironmentKey.NODE_ENV),
    };
  }

  @Public()
  @Get('init/mandatory')
  async initMandatoryData(): Promise<GlobalMandatoryDataResult> {
    return await this.appService.initMandatotyData();
  }

  @Roles(ERole.ADMIN)
  @Get('init/user')
  initUserData(): any {
    return {};
  }
}
