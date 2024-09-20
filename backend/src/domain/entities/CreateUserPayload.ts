import { IsCpf } from '@shared/IsCpf';
import { IsEmail } from '@shared/IsEmail';
import { IsIsoDate } from '@shared/IsIsoString';
import { IsPassword } from '@shared/IsPassword';
import { IsText } from '@shared/IsText';

export class CreateUserPayload {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;

  @IsText()
  name: string;

  @IsCpf()
  cpf: string;

  @IsIsoDate()
  birthday: string;
}
