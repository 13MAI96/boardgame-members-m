import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService
  ) {
    super({
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${configService.get<string>('AUTH_ISSUER')}.well-known/jwks.json` ,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience:  configService.get<string>('AUTH_AUDIENCE') ?? '',
      issuer: configService.get<string>('AUTH_ISSUER') ?? '',
      algorithms: ['RS256'],
    });
  }

  async validate(payload: any) {
    return payload; // el payload ya es válido si llegó acá
  }
}
