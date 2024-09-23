import { Component, inject } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { Router, RouterOutlet } from '@angular/router';

import { UserService } from '@/services/user.service';
import { InputComponent } from '@/components/Input/input.component';
import { ButtonComponent } from '@/components/Button/button.component';
import { CheckboxComponent } from '@/components/Checkbox/checkbox.component';
import { CarouselImageComponent } from '@/components/CarouselImage/carousel-image.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    SvgIconComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    CarouselImageComponent,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  private formBuilderService = inject(FormBuilder);
  readonly logged = this.userSignal.select('logged');

  protected form = this.formBuilderService.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  constructor(
    private userSignal: UserService,
    private router: Router,
  ) {
    if (this.logged()) this.navigate('');
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
