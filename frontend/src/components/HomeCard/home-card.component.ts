import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { HomeCardDonatorsComponent } from '@/components/HomeCardDonators/home-card-donators.component';

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [SvgIconComponent, HomeCardDonatorsComponent],
  templateUrl: './home-card.component.html',
})
export class HomeCardComponent {
  @Input() urgency: boolean = false;
}
