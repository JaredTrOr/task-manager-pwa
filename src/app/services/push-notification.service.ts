import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import ApiResponse from '../models/api.interface';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  private URL = 'http://localhost:3000/push-notification';

  constructor(private http: HttpClient) { }

  saveSubscription(subscription: PushSubscription) { 
    return this.http.post<ApiResponse<null>>(`${this.URL}/save-subscription`, subscription);
  }
}
