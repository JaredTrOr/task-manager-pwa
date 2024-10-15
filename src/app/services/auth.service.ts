import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User,UserLogin } from '../models/user.interface';
import ApiResponse from '../models/api.interface';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private URL: string = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient
  ) { }

  signup(user: User) {
    return this.http.post<ApiResponse<{ token: string, user: User }> >(`${this.URL}/signup`, user);
  }

  login(user: UserLogin) {
    return this.http.post<ApiResponse<{ token: string, user: User }> >(`${this.URL}/login`, user);
  }

  logout() {
    localStorage.removeItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn() {
    return !!localStorage.getItem('token');
  }
}
