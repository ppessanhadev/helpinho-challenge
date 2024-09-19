import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

import { HelpService, THelpKeys } from '@/services/help.service';
import { InputComponent } from '@/components/Input/input.component';
import { NewHelpStepsComponent } from '@/components/NewHelpSteps/new-help-steps.componen';

@Component({
  selector: '[secondStep]',
  standalone: true,
  imports: [NewHelpStepsComponent, SvgIconComponent, InputComponent],
  templateUrl: './new-help-second-step.component.html',
})
export class NewHelpSecondStepComponent {
  readonly title = this.helpSignal.select('title');
  readonly image = this.helpSignal.select('image');
  readonly description = this.helpSignal.select('description');

  constructor(private helpSignal: HelpService) {}

  onHandleTitle(value: string, key: THelpKeys) {
    this.helpSignal.set(key, value);
  }

  onHandleChange(event: Event, key: THelpKeys) {
    const value = (event.target as HTMLInputElement).value;
    this.helpSignal.set(key, value);
  }
}
