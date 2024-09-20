import { randomUUID } from 'crypto';
import { UserModel } from '@domain/models/User';
import { CreateUserPayload } from '@domain/entities/CreateUserPayload';
import { Prisma } from '@prisma/client';

export const createToUserModel = (body: CreateUserPayload): Prisma.UserCreateInput => ({
  email: body.email,
  name: body.name,
  password: body.password,
  birthday: body.birthday,
  cpf: body.cpf,
});
