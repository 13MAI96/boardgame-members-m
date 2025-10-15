import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TokenService } from './token.service';
import { OneTimeToken, OneTimeTokenSchema } from '../schemas/one-time-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OneTimeToken.name, schema: OneTimeTokenSchema },
    ]),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
