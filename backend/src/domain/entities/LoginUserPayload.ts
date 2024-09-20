import { IsEmail } from '@shared/IsEmail';
import { IsText } from '@shared/IsText';

export class LoginUserPayload {
  @IsEmail()
  email: string;

  @IsText()
  password: string;
}
