import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoleModule } from './role/role.module';
import { InvitationModule } from './invitation/invitation.module';
import { GuestModule } from './guest/guest.module';
import { UserInvitationModule } from './user-invitation/user-invitation.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EnvironmentKey, EnvironmentName } from './keys';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guards';
import { RolesGuard } from './guards/role.guard';

@Module({
  imports: [
    RoleModule,
    InvitationModule,
    GuestModule,
    UserInvitationModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get(EnvironmentKey.DB_HOST),
        port: +configService.get<number>(EnvironmentKey.DB_PORT),
        username: configService.get(EnvironmentKey.DB_USERNAME),
        password: configService.get(EnvironmentKey.DB_PASSWORD),
        database: configService.get(EnvironmentKey.DB_DATABASE),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize:
          configService.get(EnvironmentKey.NODE_ENV) !== EnvironmentName.PROD,
        retryAttempts: 4,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
