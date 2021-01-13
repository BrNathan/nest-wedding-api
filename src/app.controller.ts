import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService, GlobalMandatoryDataResult } from './app.service';
import { Public } from './decorator/public.decorator';
import { EnvironmentKey } from './keys';

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

  @Get('init/user')
  initUserData(): any {
    return {};
  }
}
