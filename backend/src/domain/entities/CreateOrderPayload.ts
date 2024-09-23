import { IsGoal } from '@shared/IsGoal';
import { IsText } from '@shared/IsText';

export class CreateOrderPayload {
  @IsText()
  title: string;

  @IsText()
  description: string;

  @IsGoal()
  goal: number;
}
