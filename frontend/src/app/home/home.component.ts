import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../components/Header/header.component';
import { SvgIconComponent } from 'angular-svg-icon';
import { ButtonComponent } from '../../components/Button/button.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SvgIconComponent, ButtonComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  title = 'helpinho';
}
