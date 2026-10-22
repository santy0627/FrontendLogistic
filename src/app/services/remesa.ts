import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Remesa } from '../interfaces/remesa';

@Injectable({
    providedIn: 'root',
})

export class RemesaService {
    private http = inject(HttpClient);

    private getHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token')

        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        })
    }

    getAllRemesas() : Observable<Remesa[]> {
        return this.http.get<Remesa[]>('http://localhost:3000/api/remesas', { headers: this.getHeaders() })
    }
}
