import { RouterOutlet } from '@angular/router';
import { Component, inject } from '@angular/core';

import { UserService } from '@/services/user.service';
import { HeaderComponent } from '@/components/Header/header.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './helps.component.html',
})
export class HelpsComponent {
  private userSignal = inject(UserService);
  readonly logged = this.userSignal.select('logged');
}
