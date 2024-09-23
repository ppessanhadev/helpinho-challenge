import { Router, RouterLink } from '@angular/router';
import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';

import { UserService } from '@/services/user.service';
import { ButtonComponent } from '@/components/Button/button.component';
import { UserIconComponent } from '@/components/UserIcon/user-icon.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [ButtonComponent, UserIconComponent, SvgIconComponent, CommonModule, RouterLink],
})
export class HeaderComponent {
  @Input() hideLinks?: boolean = false;
  protected logged = this.userSignal.select('logged');
  protected user = this.userSignal.select('name');
  protected email = this.userSignal.select('email');

  constructor(
    private router: Router,
    private userSignal: UserService,
  ) {}

  protected selectedPath(path: string) {
    if (path === this.router.url) {
      return 'text-base text-primary-500 underline underline-offset-8 decoration-2 rounded font-semibold';
    }
    return 'text-base text-neutral-400 font-semibold disabled:opacity-50';
  }

  protected handleLogout() {
    this.userSignal.logout();
  }
}
