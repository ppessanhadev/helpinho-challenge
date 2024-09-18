import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from '@/services/user.service';
import { InputComponent } from '@/components/Input/input.component';
import { CheckboxComponent } from '@/components/Checkbox/checkbox.component';
import { ButtonComponent } from '../../components/Button/button.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, SvgIconComponent, InputComponent, CheckboxComponent, ButtonComponent],
  providers: [UserService],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly logged = this.userSignal.select('logged');

  constructor(
    private userSignal: UserService,
    private router: Router,
  ) {
    if (this.logged()) this.router.navigate(['/']);
  }
}
