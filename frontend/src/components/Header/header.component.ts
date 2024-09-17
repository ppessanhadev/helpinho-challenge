import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonComponent } from '@/components/Button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [ButtonComponent, SvgIconComponent],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  public selectedPath(path: string) {
    if (path === this.router.url) {
      return 'text-base text-primary-500 underline underline-offset-8 decoration-2 rounded font-semibold';
    }
    return 'text-base text-neutral-400 font-semibold';
  }
}
