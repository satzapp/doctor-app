import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private globalService: GlobalService) { }

  login(payload: Object) {
    return this.globalService.post('user/login', payload);
  }

  register(payload: Object) {
    return this.globalService.post('user/registration', payload);
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
