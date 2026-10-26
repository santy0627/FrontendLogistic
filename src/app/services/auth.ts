import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})

export class Auth {
  private http = inject(HttpClient); //POST GET PUT y demas consultas HTTP

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token')

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
  }

  register(user: User) : Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/register', user)
  }

  login(credentials: Pick<User, 'email' | 'password'>): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/login', credentials)
  }

  saveTokenAndRole(token : string, roleUser: string) {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('roleUser', roleUser);
  }

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');

    if(token){
      return true;
    } else {
      return false;
    }

  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roleUser');
  }

  getUsersByRole(role: string): Observable<User[]> {
    return this.http.get<User[]>(`http://localhost:3000/api/auth/users/${role}`, { headers: this.getHeaders() })
  }
}
