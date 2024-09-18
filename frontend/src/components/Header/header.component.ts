import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

import { UserService } from '@/services/user.service';
import { ButtonComponent } from '@/components/Button/button.component';
import { UserIconComponent } from '@/components/UserIcon/user-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [ButtonComponent, UserIconComponent, SvgIconComponent, CommonModule],
  providers: [UserService],
})
export class HeaderComponent {
  readonly logged = this.userSignal.select('logged');

  constructor(
    private router: Router,
    private userSignal: UserService,
  ) {}

  public selectedPath(path: string) {
    if (path === this.router.url) {
      return 'text-base text-primary-500 underline underline-offset-8 decoration-2 rounded font-semibold';
    }
    return 'text-base text-neutral-400 font-semibold';
  }

  public navigateToLogin() {
    this.router.navigate(['login']);
  }
}
