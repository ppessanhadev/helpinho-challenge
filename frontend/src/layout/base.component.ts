import { RouterOutlet } from '@angular/router';
import { SvgIconComponent } from 'angular-svg-icon';
import { Component, effect, HostBinding, signal } from '@angular/core';
import { ButtonComponent } from '../components/Button/button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SvgIconComponent, ButtonComponent],
  templateUrl: './base.component.html',
})
export class BaseLayoutComponent {
  public darkMode = signal<boolean>(false);

  @HostBinding('class.dark') get mode() {
    return this.darkMode();
  }

  constructor() {
    if ('theme' in localStorage) {
      this.darkMode.set(JSON.parse(window.localStorage.getItem('theme') ?? 'false'));
    } else {
      this.setSystemTheme();
    }

    effect(() => {
      window.localStorage.setItem('theme', JSON.stringify(this.darkMode()));
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

  public onClick() {
    alert('EPAAAA!!');
  }
}
