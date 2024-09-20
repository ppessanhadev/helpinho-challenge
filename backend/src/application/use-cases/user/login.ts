import { compareHash } from '@common';
import { LoginUserPayload } from '@domain/entities/LoginUserPayload';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@repositories/user/user.repository';

@Injectable()
export class LoginUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute(body: LoginUserPayload) {
    const user = await this.userRepository.findByEmail(body.email);
    if (!user) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    const isPasswordValid = await compareHash(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email or password incorrect');
    }

    return user;
  }
}
