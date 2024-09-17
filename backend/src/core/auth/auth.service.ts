import { JwtService } from '@nestjs/jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenPayload } from '../types';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  private extractToken(authorization: string) {
    if (!authorization) {
      throw new UnauthorizedException(`Bearer in authorization header is required`);
    }

    const httpHeaders: string[] = authorization.split(' ');
    if (httpHeaders.length <= 1) {
      throw new UnauthorizedException(`Bearer in authorization doesn't contains a token`);
    }

    const token = httpHeaders[1];

    return token;
  }

  public generateToken({ id }: TokenPayload) {
    const payload = { id };
    const token = this.jwtService.sign(payload);

    return { token };
  }

  public validateToken(authorization: string) {
    try {
      const token = this.extractToken(authorization);

      const decodedJwt = this.jwtService.verify(token, { secret: 'secret' });
      if (!decodedJwt.id) {
        throw new UnauthorizedException('Token value is not a jwt token');
      }

      return decodedJwt;
    } catch (err) {
      const { name } = err;

      switch (name) {
        case 'TokenExpiredError':
          throw new UnauthorizedException('Token has expired');

        case 'JsonWebTokenError':
          throw new UnauthorizedException('Token value is not a jwt token');

        default:
          throw err;
      }
    }
  }
}
