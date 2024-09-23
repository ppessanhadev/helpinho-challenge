import { firstValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TLogin, TRegister } from '@/types';
import { BaseStoreService } from '@/services/base.service';

type TUserService = {
  logged: boolean;
  name: string;
  email: string;
  id: string;
};

@Injectable({ providedIn: 'root' })
export class UserService extends BaseStoreService<TUserService> {
  constructor(private http: HttpClient) {
    super();
  }

  public async login(body: TLogin) {
    try {
      const { token } = await firstValueFrom(
        this.http.post<{ token: string }>('http://localhost:4000/v1/users/login', {
          ...body,
        }),
      );
      this.setAccount(token);
      return { error: false };
    } catch (e) {
      return { error: true };
    }
  }

  public async register(body: TRegister) {
    try {
      const { token } = await firstValueFrom(
        this.http.post<{ token: string }>('http://localhost:4000/v1/users', {
          ...body,
        }),
      );
      this.setAccount(token);
      return { error: false };
    } catch (e) {
      return { error: true };
    }
  }

  public setAccount(token?: string) {
    const storage = localStorage.getItem('token') || token;

    if (!storage) {
      throw new Error();
    }

    const { id, name, email, exp } = jwtDecode<{
      id: string;
      name: string;
      email: string;
      exp: number;
    }>(storage);

    if (exp > Date.now()) {
      this.setState({ email: '', id: '', name: '', logged: false });
      localStorage.removeItem('token');
    } else {
      this.setState({ id, name, email, logged: true });
    }

    localStorage.setItem('token', storage);
  }
}
