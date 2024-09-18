import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, SvgIconComponent],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  @Input() label?: string;
  @Input() value?: boolean = false;
}
