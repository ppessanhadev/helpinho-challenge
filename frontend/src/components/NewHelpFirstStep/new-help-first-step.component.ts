import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

import { HelpService, TCategory } from '@/services/help.service';

type TOptions = { name: string; icon: string; category: TCategory };

@Component({
  selector: '[firstStep]',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './new-help-first-step.component.html',
})
export class NewHelpFirstStepComponent {
  readonly selected = this.helpSignal.select('category');

  readonly options: TOptions[] = [
    { name: 'Jogos', icon: 'public/assets/rocket.svg', category: 'games' },
    { name: 'Saúde', icon: 'public/assets/heart.svg', category: 'health' },
    { name: 'Música', icon: 'public/assets/headphones.svg', category: 'music' },
    { name: 'Reforma', icon: 'public/assets/home.svg', category: 'reform' },
    { name: 'Emergência', icon: 'public/assets/life-buoy.svg', category: 'emergency' },
    { name: 'Hospitalar', icon: 'public/assets/activity.svg', category: 'hospital' },
  ];

  constructor(private helpSignal: HelpService) {}

  public onSelect(opt: TCategory) {
    if (this.selected() === opt) {
      return this.helpSignal.set('category', null);
    }
    this.helpSignal.set('category', opt);
  }
}
