import { firstValueFrom } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Login } from '@/types/Login';
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

  public async login(body: Login) {
    try {
      const { token } = await firstValueFrom(
        this.http.post<{ token: string }>('http://localhost:4000/v1/users/login', {
          ...body,
        }),
      );
      const content = this.decode(token);

      this.setState({ ...content, logged: true });

      return { error: false };
    } catch (e) {
      return { error: true };
    }
  }

  private decode(token: string) {
    const { id, name, email } = jwtDecode<{ id: string; name: string; email: string }>(token);
    return { id, name, email };
  }
}
