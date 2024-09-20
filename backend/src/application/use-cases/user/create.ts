import { Body, ConflictException, Inject, Injectable } from '@nestjs/common';

import { createToUserModel } from '@mappers/user';
import { UserRepository } from '@repositories/user/user.repository';
import { CreateUserPayload } from '@domain/entities/CreateUserPayload';
import { generateHash } from '@common';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject(UserRepository)
    private userRepository: UserRepository,
  ) {}

  public async execute(@Body() body: CreateUserPayload) {
    const user = await this.userRepository.findByEmail(body.email);
    if (user) {
      throw new ConflictException('User with the current email already exists.');
    }

    const password = await generateHash(body.password);
    const model = createToUserModel({ ...body, password });

    return this.userRepository.create(model);
  }
}
