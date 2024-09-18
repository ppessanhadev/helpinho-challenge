import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { UserIconComponent } from '@/components/UserIcon/user-icon.component';
import { HomeCardDonatorsComponent } from '@/components/HomeCardDonators/home-card-donators.component';

@Component({
  selector: 'app-home-card',
  standalone: true,
  imports: [SvgIconComponent, HomeCardDonatorsComponent, UserIconComponent],
  templateUrl: './home-card.component.html',
})
export class HomeCardComponent {
  @Input() urgency: boolean = false;
}
