import { firstValueFrom } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
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
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    super();
  }

  private reset() {
    localStorage.removeItem('token');
    this.setState({ email: '', id: '', name: '', logged: false });
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

  public async logout() {
    this.reset();
    await this.router.navigate(['']);
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
    const helper = new JwtHelperService();
    const storage = localStorage.getItem('token') || token;

    if (!storage) {
      throw new Error();
    }

    const { id, name, email } = helper.decodeToken(storage);

    if (helper.isTokenExpired(storage)) {
      this.reset();
    } else {
      this.setState({ id, name, email, logged: true });
    }

    localStorage.setItem('token', storage);
  }
}
