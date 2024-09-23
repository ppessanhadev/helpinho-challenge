import { RouterOutlet } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '@/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './base.component.html',
})
export class BaseLayoutComponent implements OnInit {
  private userSignal = inject(UserService);

  ngOnInit() {
    this.userSignal.setAccount();
  }
}
