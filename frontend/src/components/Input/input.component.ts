import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() type: 'text' | 'number' = 'text';
  @Input() label?: string;
  @Input() value?: string;
  @Input() error?: string;
  @Input() prefix?: string;
  @Input() suffix?: string;
}
