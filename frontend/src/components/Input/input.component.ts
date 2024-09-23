import { NgClass, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() label?: string;
  @Input() value?: string = '';
  @Input() placeholder?: string = '';
  @Input() mask?: string = '';
  @Input() error?: string;
  @Input() control: FormControl = new FormControl();
  @Output() changer = new EventEmitter();

  public handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.changer.emit(value);
  }
}
