import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from '@/services/user.service';
import { HeaderComponent } from '@/components/Header/header.component';
import { NewHelpStepsComponent } from '@/components/NewHelpSteps/new-help-steps.componen';

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NewHelpStepsComponent],
  providers: [UserService],
  templateUrl: './new-help.component.html',
})
export class NewHelpComponent {
  readonly logged = this.userSignal.select('logged');

  constructor(
    private userSignal: UserService,
    private router: Router,
  ) {
    if (!this.logged()) {
      this.router.navigate(['/login']);
    }
  }
}
