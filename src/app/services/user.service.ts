import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from '../models/api.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL: string = 'http://localhost:3000/user';

  constructor(
    private http: HttpClient
  ) { }

  // Http requests
  getUserInfo() {
    return this.http.get<ApiResponse<User>>(`${this.URL}/get-profile`);
  }
}
