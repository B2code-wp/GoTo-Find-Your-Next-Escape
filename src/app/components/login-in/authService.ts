import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

 interface RegisterRequest {
  name: string;
  surname: string;
  email: string;
  password: string;
}

 interface LoginRequest {
  email: string;
  password: string;
}

 interface AuthResponse {
  token?: string;
  message?: string;
  user?: {
    email?: string;
    name?: string;
    surname?: string;
    role?: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  // ============================
  // REGISTER
  // ============================
register(data: RegisterRequest): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(
    `${this.apiUrl}/register`,
    data
  );
}

  // ============================
  // LOGIN
  // ============================
  login(data: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/login`,
      data
    );
  }

  // ============================
  // TOKEN MANAGEMENT
  // ============================
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
