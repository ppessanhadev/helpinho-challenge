import { Component } from '@angular/core';
import { UserService } from '@/services/user.service';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-home-banner-logged',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './home-banner-logged.component.html',
})
export class HomeBannerLoggedComponent {
  readonly user = this.userSignal.select('name');

  constructor(private userSignal: UserService) {}
}
