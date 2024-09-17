import { Injectable } from '@nestjs/common';
import { Dummy, Prisma, PrismaClient } from '@prisma/client';
import { BaseRepository } from 'src/core/base/repository';

@Injectable()
export class DummyRepository extends BaseRepository<Prisma.DummyCreateInput, Dummy> {
  constructor() {
    super(new PrismaClient(), 'dummy');
  }
}
