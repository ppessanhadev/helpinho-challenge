import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-home-card-donators',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './home-card-donators.component.html',
})
export class HomeCardDonatorsComponent {
  @Input() donators: Array<string> = Array(15).fill('public/assets/noise.png');
}
