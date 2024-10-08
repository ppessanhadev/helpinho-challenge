import { Component, inject } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '@/services/user.service';
import { InputComponent } from '@/components/Input/input.component';
import { ButtonComponent } from '@/components/Button/button.component';
import { CheckboxComponent } from '@/components/Checkbox/checkbox.component';
import { CarouselImageComponent } from '@/components/CarouselImage/carousel-image.component';
import { TLogin } from '@/types';

type Errors = {
  required?: boolean;
  email: boolean;
  minlength?: { requiredLength: number };
};

@Component({
  standalone: true,
  imports: [
    RouterOutlet,
    SvgIconComponent,
    InputComponent,
    CheckboxComponent,
    ButtonComponent,
    CarouselImageComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private router = inject(Router);
  private userSignal = inject(UserService);
  private formBuilderService = inject(FormBuilder);

  readonly logged = this.userSignal.select('logged');
  errorFromLogin = false;

  protected form = this.formBuilderService.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public getError(name: 'email' | 'password') {
    const error = this.form.controls[name].errors as Errors;

    if (error?.required) {
      return 'Campo obrigatório.';
    } else if (error?.email) {
      return 'Campo precisa ser um e-mail válido.';
    } else if (error?.minlength) {
      return `A senha precisa ter ao menos ${error.minlength.requiredLength} caracteres.`;
    }

    return '';
  }

  public getControl(name: 'email' | 'password') {
    return this.form.get(name) as FormControl;
  }

  public async handleClick() {
    const { error } = await this.userSignal.login(this.form.value as TLogin);

    if (error) {
      this.errorFromLogin = true;
    } else {
      await this.router.navigate(['']);
    }

    this.form.reset();
  }

  public navigate(path: string) {
    this.router.navigate([path]);
  }
}
