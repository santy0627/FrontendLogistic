import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Remesa } from '../interfaces/remesa';

@Injectable({
    providedIn: 'root',
})

export class Remesas {
    private http = inject(HttpClient);

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('token')

        return new HttpHeaders({
            Autorization: `Bearer ${token}`
        })
    }

    getAllRemesas() : Observable<Remesa[]> {
        return this.http.get<Remesa[]>('http://localhost:3000/api/remesas', { headers: this.getHeaders() })
    }
}
