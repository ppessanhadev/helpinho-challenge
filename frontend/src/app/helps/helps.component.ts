import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from '@/services/user.service';
import { HeaderComponent } from '@/components/Header/header.component';

@Component({
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './helps.component.html',
})
export class HelpsComponent {
  readonly logged = this.userSignal.select('logged');

  constructor(
    private userSignal: UserService,
    private router: Router,
  ) {
    if (!this.logged()) {
      this.router.navigate(['/login']);
    }
  }
}
