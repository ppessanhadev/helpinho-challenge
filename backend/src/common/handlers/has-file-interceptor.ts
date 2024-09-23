import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export const HasFileInterceptor = (isFile: boolean) => {
  if (!isFile) {
    return UseInterceptors(FileInterceptor('file'));
  }

  return () => {};
};
