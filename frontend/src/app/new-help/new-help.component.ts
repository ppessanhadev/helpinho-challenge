import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from '@/services/user.service';
import { HeaderComponent } from '@/components/Header/header.component';
import { NewHelpStepsComponent } from '@/components/NewHelpSteps/new-help-steps.componen';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NewHelpStepsComponent, SvgIconComponent],
  providers: [UserService],
  templateUrl: './new-help.component.html',
})
export class NewHelpComponent {
  readonly logged = this.userSignal.select('logged');
  readonly options = [
    { name: 'Jogos', icon: 'public/assets/rocket.svg' },
    { name: 'Saúde', icon: 'public/assets/heart.svg' },
    { name: 'Música', icon: 'public/assets/headphones.svg' },
    { name: 'Reforma', icon: 'public/assets/home.svg' },
    { name: 'Emergência', icon: 'public/assets/life-buoy.svg' },
    { name: 'Hospitalar', icon: 'public/assets/activity.svg' },
  ];

  constructor(
    private userSignal: UserService,
    private router: Router,
  ) {
    if (!this.logged()) {
      this.router.navigate(['/login']);
    }
  }
}
