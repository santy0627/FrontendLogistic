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

    getRemesasPorEstado(estado: string) : Observable<Remesa[]> {
        return this.http.get<Remesa[]>(`http://localhost:3000/api/remesas/${estado}`, { headers: this.getHeaders() })
    }

    createRemesa(remesa : any) : Observable<Remesa> {
        return this.http.post<Remesa>('http://localhost:3000/api/remesas', remesa, { headers: this.getHeaders() })
    }

    updateRemesa(id: string, remesa: any) : Observable<Remesa> {
        return this.http.put<Remesa>(`http://localhost:3000/api/remesas/${id}`, remesa, { headers: this.getHeaders() })
    }

    deleteRemesa(id: string | undefined) : Observable<Remesa> {
        return this.http.delete<Remesa>(`http://localhost:3000/api/remesas/${id}`,{ headers: this.getHeaders() })
    }
}
