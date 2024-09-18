import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from '@/services/user.service';
import { HeaderComponent } from '@/components/Header/header.component';
import { FooterComponent } from '@/components/Footer/footer.component';
import { HomeCardComponent } from '@/components/HomeCard/home-card.component';
import { HomeBannerComponent } from '@/components/HomeBanner/home-banner.component';
import { HomeStagesComponent } from '@/components/HomeStages/home-stages.component';
import { HomeSearchComponent } from '@/components/HomeSearch/home-search.component';
import { HomeBannerLoggedComponent } from '@/components/HomeBannerLogged/home-banner-logged.component';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeBannerComponent,
    HomeBannerLoggedComponent,
    HomeStagesComponent,
    HomeSearchComponent,
    HomeCardComponent,
    FooterComponent,
  ],
  providers: [UserService],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  readonly logged = this.userSignal.select('logged');

  constructor(
    private userSignal: UserService,
    private router: Router,
  ) {
    if (this.logged()) this.router.navigate(['/']);
  }
}
