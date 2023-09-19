import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://159.65.96.86:8080/services/auth/signin';
  private isAuthenticated = false;
  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(this.apiUrl, body).pipe(
      tap((authResponse: any) => {
        if (authResponse && authResponse.accessToken) {
          this.isAuthenticated = true;
          this.accessToken = authResponse.accessToken;
        }
      })
    );
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string | null {
    return this.accessToken;
  }

  logout() {
    this.isAuthenticated = false;
    this.accessToken = null;
  }
}
