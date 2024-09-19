import { SvgIconComponent } from 'angular-svg-icon';
import { Component, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from '@/services/user.service';
import { HelpService } from '@/services/help.service';
import { HeaderComponent } from '@/components/Header/header.component';
import { NewHelpStepsComponent } from '@/components/NewHelpSteps/new-help-steps.componen';
import { NewHelpFirstStepComponent } from '@/components/NewHelpFirstStep/new-help-first-step.component';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    SvgIconComponent,
    HeaderComponent,
    NewHelpStepsComponent,
    NewHelpFirstStepComponent,
  ],
  providers: [UserService, HelpService],
  templateUrl: './new-help.component.html',
})
export class NewHelpComponent implements OnDestroy {
  readonly logged = this.userSignal.select('logged');
  readonly step = this.helpSignal.select('step');
  readonly selected = this.helpSignal.select('category');

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
}
