import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() type: 'text' | 'number' | 'email' | 'password' = 'text';
  @Input() label?: string;
  @Input() value?: string = '';
  @Input() placeholder?: string = '';
  @Input() error?: string;
  @Output() changer = new EventEmitter();

  public handleChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.changer.emit(value);
  }
}
