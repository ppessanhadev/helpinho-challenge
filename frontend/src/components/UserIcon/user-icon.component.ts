import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [SvgIconComponent, CommonModule],
  templateUrl: './user-icon.component.html',
})
export class UserIconComponent {
  @Input() image?: string = 'public/assets/user-icon.png';
  @Input() name?: string = 'Usuário';
  @Input() email?: string;
  @Input() color?: 'primary' | 'secondary' = 'primary';
  @Input() hideSm?: boolean = false;
}
