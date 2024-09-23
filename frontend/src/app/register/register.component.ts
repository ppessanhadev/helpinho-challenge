import { Component, inject, OnInit } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';
import { Router, RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { UserService } from '@/services/user.service';
import { InputComponent } from '@/components/Input/input.component';
import { ButtonComponent } from '@/components/Button/button.component';
import { CheckboxComponent } from '@/components/Checkbox/checkbox.component';
import { CarouselImageComponent } from '@/components/CarouselImage/carousel-image.component';

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
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  private router = inject(Router);
  private userSignal = inject(UserService);
  private formBuilderService = inject(FormBuilder);
  protected errorOnRegister: string = '';
  readonly logged = this.userSignal.select('logged');

  protected form = this.formBuilderService.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    birthday: ['', [Validators.required, Validators.minLength(8)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public ngOnInit() {
    if (this.logged()) this.navigate('');
  }

  protected navigate(path: string) {
    this.router.navigate([path]);
  }

  protected getError(name: 'name' | 'email' | 'password' | 'cpf' | 'birthday') {
    const error = this.form.controls[name].errors as Errors;

    if (error?.required) {
      return 'Campo obrigatório.';
    } else if (error?.email) {
      return 'Campo precisa ser um e-mail válido.';
    } else if (!['cpf', 'birthday'].includes(name) && error?.minlength) {
      return `A campo ${name} precisa ter ao menos ${error.minlength.requiredLength} caracteres.`;
    } else if (name === 'cpf' && error?.minlength) {
      return 'Campo precisa ser um CPF válido.';
    } else if (name === 'birthday' && error?.minlength) {
      return 'Campo precisa ser uma data válida. Ex: 25/12/1995';
    }

    return '';
  }

  protected getControl(key: string) {
    return this.form.get(key) as FormControl;
  }

  protected handleRegistration() {}
}
