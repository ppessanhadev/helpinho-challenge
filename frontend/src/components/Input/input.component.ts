import { NgClass, NgIf } from '@angular/common';
// import { ControlValueAccessor, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [NgClass, NgIf, ReactiveFormsModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() label?: string;
  @Input() value?: string = '';
  @Input() placeholder?: string = '';
  @Input() error?: string;
  @Input() control: FormControl = new FormControl();
  @Output() changer = new EventEmitter();

  public handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.changer.emit(value);
  }
}
