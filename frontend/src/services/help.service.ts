import { Injectable } from '@angular/core';
import { BaseStoreService } from './base.service';

export type TCategory = 'games' | 'health' | 'music' | 'reform' | 'emergency' | 'hospital';

type THelpService = {
  step: number;
  category: TCategory | null;
};

@Injectable({ providedIn: 'root' })
export class HelpService extends BaseStoreService<THelpService> {
  constructor() {
    super();
    this.setState({ category: null, step: 1 });
  }
}
