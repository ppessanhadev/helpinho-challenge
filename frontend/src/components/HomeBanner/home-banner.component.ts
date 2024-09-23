import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonComponent } from '@/components/Button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-banner',
  standalone: true,
  imports: [SvgIconComponent, ButtonComponent, RouterLink],
  templateUrl: './home-banner.component.html',
})
export class HomeBannerComponent {}
