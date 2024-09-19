import { SvgIconComponent } from 'angular-svg-icon';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from '@/services/user.service';
import { HelpService } from '@/services/help.service';
import { HeaderComponent } from '@/components/Header/header.component';
import { NewHelpStepsComponent } from '@/components/NewHelpSteps/new-help-steps.component';
import { NewHelpFirstStepComponent } from '@/components/NewHelpFirstStep/new-help-first-step.component';
import { NewHelpSecondStepComponent } from '@/components/NewHelpSecondStep/new-help-second-step.component';
import { NewHelpThirdStepComponent } from '@/components/NewHelpThirdStep/new-help-third-step.component';
import { NewHelpFourthStepComponent } from '@/components/NewHelpFourthStep/new-help-fourth-step.component';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    SvgIconComponent,
    HeaderComponent,
    NewHelpStepsComponent,
    NewHelpFirstStepComponent,
    NewHelpSecondStepComponent,
    NewHelpThirdStepComponent,
    NewHelpFourthStepComponent,
  ],
  providers: [UserService, HelpService],
  templateUrl: './new-help.component.html',
})
export class NewHelpComponent implements OnDestroy {
  readonly logged = this.userSignal.select('logged');
  readonly step = this.helpSignal.select('step');

  constructor(
    private userSignal: UserService,
    private router: Router,
    private helpSignal: HelpService,
  ) {
    if (!this.logged()) {
      this.router.navigate(['/login']);
    }
  }

  ngOnDestroy() {
    this.helpSignal.setState({ category: null, step: 1 });
  }

  public handleContinue() {
    if (this.step() < 4) {
      return this.helpSignal.increment('step');
    }
  }

  public handleBack() {
    if (this.step() > 1) {
      return this.helpSignal.decrement('step');
    }
    return this.router.navigate(['help']);
  }

  public disableButton() {
    const selected = this.helpSignal.select('category');
    const title = this.helpSignal.select('title');
    const description = this.helpSignal.select('description');
    const image = this.helpSignal.select('image');
    const goal = this.helpSignal.select('goal');

    switch (this.step()) {
      case 1:
        return !selected();
      case 2:
        return !(title() && description() && image());
      case 3:
        return !goal();
      default:
        return false;
    }
  }
}
