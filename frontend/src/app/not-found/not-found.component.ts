import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {}
