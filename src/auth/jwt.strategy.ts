import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'saeid',
      //       logging: true,
    });
  }
  async validate(payload: any) {
    return {
      user_id: payload.user_id,
      first_name: payload.first_name,
      last_name: payload.last_name,
      email: payload.email,
    };
  }
}
