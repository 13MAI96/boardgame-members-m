import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { CorsMiddleware } from './cors.middleware';
import { AuthModule } from './auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule,
    UserModule, 
    MongooseModule.forRoot(process.env.MONGO ?? ''),
  ],
  controllers: [
    AppController, 
    LoginController, 
  ],
  providers: [AppService, LoginService],
})
export class AppModule {
  configure( consumer: MiddlewareConsumer){
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
