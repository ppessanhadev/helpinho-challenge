import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

import { HelpService } from '@/services/help.service';

type TOptions = { name: string; icon: string; goal: number };

@Component({
  selector: '[thirdStep]',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './new-help-third-step.component.html',
})
export class NewHelpThirdStepComponent {
  readonly selected = this.helpSignal.select('goal');

  readonly options: TOptions[] = [
    { name: 'R$ 100,00', icon: 'public/assets/rocket.svg', goal: 100 },
    { name: 'R$ 1.000,00', icon: 'public/assets/rocket.svg', goal: 1000 },
    { name: 'R$ 5.000,00', icon: 'public/assets/rocket.svg', goal: 5000 },
    { name: 'R$ 10.000,00', icon: 'public/assets/heart.svg', goal: 10000 },
    { name: 'R$ 20.000,00', icon: 'public/assets/heart.svg', goal: 20000 },
    { name: 'R$ 50.000,00', icon: 'public/assets/heart.svg', goal: 30000 },
  ];

  constructor(private helpSignal: HelpService) {}

  public onSelect(goal: number) {
    if (this.selected() === goal) {
      return this.helpSignal.set('goal', 0);
    }
    this.helpSignal.set('goal', goal);
  }
}
