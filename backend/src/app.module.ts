import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { CorsMiddleware } from './cors.middleware';

@Module({
  imports: [],
  controllers: [AppController, LoginController],
  providers: [AppService, LoginService],
})
export class AppModule {
  configure( consumer: MiddlewareConsumer){
    consumer.apply(CorsMiddleware).forRoutes('*');
  }
}
