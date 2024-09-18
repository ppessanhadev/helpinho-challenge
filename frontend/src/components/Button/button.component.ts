import { tv } from 'tailwind-variants';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { SvgIconComponent } from 'angular-svg-icon';

const button = tv({
  base: 'rounded-xl text-white text-sm font-semibold px-2.5 py-4 antiliased enabled:hover:brightness-90 ease-in-out duration-200 outline-none disabled:bg-neutral-100 disabled:text-neutral-200 disabled:fill-none disabled:stroke-neutral-200',
  variants: {
    color: {
      primary: 'bg-primary-500 text-white',
      secondary: 'bg-secondary-500 text-white',
      success: 'bg-success-500 text-white',
      warning: 'bg-warning-600 text-white',

      'primary-tonal': 'bg-primary-100 dark:bg-primary-900 text-primary-500',
      'secondary-tonal': 'bg-secondary-100 dark:bg-secondary-900 text-secondary-500',
      'success-tonal': 'bg-success-100 dark:bg-success-900 text-secondary-500',
      'warning-tonal': 'bg-warning-100 dark:bg-warning-900 text-warning-600 dark:text-warning-400',

      'primary-white': 'bg-white text-primary-500',
      'secondary-white': 'bg-white text-secondary-500',
      'success-white': 'bg-white text-secondary-500',
      'warning-white': 'bg-white text-warning-600 dark:"text-warning-400',
    },
    size: {
      sm: 'text-sm py-2 px-3.5',
      md: 'text-sm py-2.5 px-4',
      lg: 'text-base py-2.5 px-[1.125rem]',
      xl: 'text-base py-3 px-5',
      'icon-sm': 'p-2',
      'icon-md': 'p-2.5',
      'icon-lg': 'p-3',
      'icon-xl': 'p-3.5',
    },
  },
});

type Sizes = 'sm' | 'md' | 'lg' | 'xl';
type Colors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'primary-tonal'
  | 'secondary-tonal'
  | 'success-tonal'
  | 'warning-tonal'
  | 'primary-white'
  | 'secondary-white'
  | 'success-white'
  | 'warning-white';

@Component({
  selector: 'app-base-button',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './button.component.html',
})
export class ButtonComponent implements OnInit {
  public definedClass!: string;

  @ViewChild('children') children!: ElementRef;
  @Input() class = '';
  @Input() icon = '';
  @Input() prefix = '';
  @Input() suffix = '';
  @Input() disabled = false;
  @Input() size: Sizes = 'md';
  @Input() color: Colors = 'primary';

  ngOnInit() {
    this.definedClass = button({
      size: this.icon ? `icon-${this.size}` : this.size,
      color: this.color,
      class: this.class,
    });
  }
}
