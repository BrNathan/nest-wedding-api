import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AppService,
  GlobalMandatoryDataResult,
  InitUserDataResult,
} from './app.service';
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
    };
  }

  @Public()
  @Get('init/mandatory')
  async initMandatoryData(): Promise<GlobalMandatoryDataResult> {
    return await this.appService.initMandatotyData();
  }

  @Roles(ERole.ADMIN)
  @Get('init/user')
  async initUserData(): Promise<InitUserDataResult> {
    return await this.appService.initUserData();
  }

  @Roles(ERole.ADMIN)
  @Get('getConfig')
  getConfig(): any {
    const toto = Object.values(EnvironmentKey);
    return toto.map((t) => {
      return {
        key: EnvironmentKey[t],
        value: this.configService.get(EnvironmentKey[t]),
      };
    });
  }
}
