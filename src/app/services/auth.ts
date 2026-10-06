import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})

export class Auth {
  private http = inject(HttpClient); //POST GET PUT y demas consultas HTTP

  register(user: User) : Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/register', user)
  }

  login(credentials: Pick<User, 'email' | 'password'>): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/login', credentials)
  }
}
