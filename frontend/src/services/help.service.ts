import { Injectable } from '@angular/core';
import { BaseStoreService } from './base.service';

export type TCategory = 'games' | 'health' | 'music' | 'reform' | 'emergency' | 'hospital';
export type THelpKeys = keyof THelpService;

type THelpService = {
  step: number;
  category: TCategory | null;
  title?: string;
  image?: string;
  description?: string;
  goal?: number;
};

@Injectable({ providedIn: 'root' })
export class HelpService extends BaseStoreService<THelpService> {
  constructor() {
    super();
    this.setState({ category: null, step: 2, title: '', description: '', image: '', goal: 0 });
  }
}
