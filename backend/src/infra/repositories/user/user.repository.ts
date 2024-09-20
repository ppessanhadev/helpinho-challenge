import { Repository } from '@core';
import { Inject, Injectable } from '@nestjs/common';
import { UserModel } from '@domain/models/User';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class UserRepository extends Repository<Prisma.UserCreateInput, UserModel> {
  constructor(
    @Inject(PrismaClient)
    database: PrismaClient,
  ) {
    super(database, 'user');
  }

  public async findByEmail(email: string) {
    return super.findOne<Prisma.UserFindFirstArgs>({
      where: { email },
    });
  }
}
