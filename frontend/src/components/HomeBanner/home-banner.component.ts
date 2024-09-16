import { Component } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonComponent } from '@/components/Button/button.component';

@Component({
  selector: 'app-home-banner',
  standalone: true,
  imports: [SvgIconComponent, ButtonComponent],
  templateUrl: './home-banner.component.html',
})
export class HomeBannerComponent {}
