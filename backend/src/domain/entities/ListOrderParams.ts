import { IsPaginationRange } from '@shared/IsPaginationRange';

export class ListOrderParams {
  @IsPaginationRange()
  page: number;

  @IsPaginationRange()
  limit: number;
}
