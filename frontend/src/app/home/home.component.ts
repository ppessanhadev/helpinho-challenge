import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  templateUrl: './home.component.html',
})
export class HomeComponent {
  readonly logged = this.userSignal.select('logged');

  constructor(private userSignal: UserService) {}
}
