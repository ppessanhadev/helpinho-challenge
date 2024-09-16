import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@/components/Header/header.component';
import { HomeBannerComponent } from '@/components/HomeBanner/home-banner.component';
import { HomeStagesComponent } from '@/components/HomeStages/home-stages.component';
import { HomeSearchComponent } from '@/components/HomeSearch/home-search.component';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    HomeBannerComponent,
    HomeStagesComponent,
    HomeSearchComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
