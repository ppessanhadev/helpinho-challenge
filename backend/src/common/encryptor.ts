import * as bcrypt from 'bcryptjs';

export const generateHash = async (password: string) => bcrypt.hash(password, 8);

export const compareHash = async (password: string, hash: string) =>
  bcrypt.compare(password, hash);
