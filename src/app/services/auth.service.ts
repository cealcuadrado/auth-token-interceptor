import { LocalStorageService } from './local-storage.service';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestObject } from '../interfaces/request-object';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.apiUrl;
  key = environment.apiKey;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  requestAuthToken(): Observable<RequestObject> {
    return this.http.get<RequestObject>(`${this.url}/authentication/token/new?api_key=${this.key}`);
  }

  getAuthToken(): string {
    return this.localStorage.get('token');
  }
}
