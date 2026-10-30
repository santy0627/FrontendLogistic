import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Remesa } from '../interfaces/remesa';
import { apiUrl } from '../utils/api';

@Injectable({
    providedIn: 'root',
})

export class RemesaService {
    private http = inject(HttpClient);
    private api = apiUrl

    private getHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token')

        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        })
    }

    getAllRemesas() : Observable<Remesa[]> {
        return this.http.get<Remesa[]>(`${this.api}/remesas`, { headers: this.getHeaders() })
    }

    getRemesasPorEstado(estado: string) : Observable<Remesa[]> {
        return this.http.get<Remesa[]>(`${this.api}/remesas/${estado}`, { headers: this.getHeaders() })
    }

    createRemesa(remesa : any) : Observable<Remesa> {
        return this.http.post<Remesa>(`${this.api}/remesas`, remesa, { headers: this.getHeaders() })
    }

    updateRemesa(id: string, estado: string) : Observable<Remesa> {
        return this.http.put<Remesa>(`${this.api}/remesas/${id}`, { estado }, { headers: this.getHeaders() })
    }

    deleteRemesa(id: string | undefined) : Observable<Remesa> {
        return this.http.delete<Remesa>(`${this.api}/remesas/${id}`,{ headers: this.getHeaders() })
    }
}
