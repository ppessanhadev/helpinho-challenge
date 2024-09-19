import { Injectable } from '@angular/core';
import { BaseStoreService } from './base.service';

type TUserService = {
  logged: boolean;
  user: string;
};

@Injectable({ providedIn: 'root' })
export class UserService extends BaseStoreService<TUserService> {
  constructor() {
    super();
    this.setState({ logged: false });
  }
}
