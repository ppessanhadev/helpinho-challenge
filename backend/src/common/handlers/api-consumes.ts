import { ApiConsumes } from '@nestjs/swagger';

export const HasApiConsumes = (isFile: boolean) => {
  if (isFile) {
    return ApiConsumes('multipart/form-data');
  }
  return () => {};
};
