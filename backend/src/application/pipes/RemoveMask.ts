import { PipeTransform } from '@nestjs/common';

export class RemoveMaskPipe implements PipeTransform {
  constructor(private property: string) {}

  public transform(value: object | string) {
    if (typeof value == 'object' && value[this.property]) {
      const str = value[this.property] as string;

      value[this.property] = str.replaceAll(/\D/g, '');
    }

    return value;
  }
}
