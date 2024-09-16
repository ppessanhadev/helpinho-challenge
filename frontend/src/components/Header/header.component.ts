import { Router } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { Component, effect, signal } from '@angular/core';
import { ButtonComponent } from '@/components/Button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [ButtonComponent, SvgIconComponent],
})
export class HeaderComponent {
  public darkMode = signal<boolean>(false);

  constructor(private router: Router) {
    if ('theme' in localStorage) {
      this.darkMode.set(JSON.parse(window.localStorage.getItem('theme') ?? 'false'));
    } else {
      this.setSystemTheme();
    }

    effect(() => {
      window.localStorage.setItem('theme', JSON.stringify(this.darkMode()));
      const root = window.document.querySelector('app-root');

      if (this.darkMode()) root?.classList.add('dark');
      else root?.classList.remove('dark');
    });
  }

  private setSystemTheme() {
    const systemDarkmode = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (systemDarkmode) {
      this.darkMode.set(true);
    } else {
      this.darkMode.set(false);
    }
  }

  public selectedPath(path: string) {
    if (path === this.router.url) {
      return 'text-base text-primary-500 underline underline-offset-8 decoration-2 rounded font-semibold';
    }
    return 'text-base text-neutral-400 font-semibold';
  }
}
