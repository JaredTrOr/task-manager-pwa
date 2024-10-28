import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from '../models/api.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL: string = 'http://localhost:3000/user';
  userInfo!: User;

  constructor(
    private http: HttpClient
  ) { }

  setUserInfo(user: User) {
    this.userInfo = user;
  }

  getUserInfoProvider(): User {
    return this.userInfo;
  }

  // Http requests
  getUserInfo() {
    return this.http.get<ApiResponse<User>>(`${this.URL}/get-profile`);
  }

  udpateUserInfo(user: User) {
    return this.http.put<ApiResponse<User>>(`${this.URL}/update-profile`, user);
  }
}
