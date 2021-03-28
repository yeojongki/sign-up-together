import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { TypeormService } from './modules/typeorm/typeorm.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: TypeormService,
    }),
    UserModule,
    ConfigModule.forRoot({
      envFilePath: `.env${
        process.env.NODE_ENV === 'production' ? '' : `.${process.env.NODE_ENV}`
      }`,
      isGlobal: true,
    }),
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
