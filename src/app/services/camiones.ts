import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camion } from '../interfaces/camion';
import { apiUrl } from '../utils/api';

@Injectable({
    providedIn: 'root',
})

export class CamionService {
    private http = inject(HttpClient);
    private api = apiUrl

    private getHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token')

        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        })
    }

    getAllCamiones() : Observable<Camion[]> {
        return this.http.get<Camion[]>(`${this.api}/camion`, { headers: this.getHeaders() })
    }

    createCamion(camion : any) : Observable<Camion> {
        return this.http.post<Camion>(`${this.api}/camion`, camion, { headers: this.getHeaders() })
    }

    updateCamion(id: string, camion: any) : Observable<Camion> {
        return this.http.put<Camion>(`${this.api}/camion/${id}`, camion, { headers: this.getHeaders() })
    }

    deleteCamion(id: string | undefined) : Observable<Camion> {
        return this.http.delete<Camion>(`${this.api}/camion/${id}`, { headers: this.getHeaders() })
    }

    asignarRemesas(id: string | undefined) : Observable<Camion> {
        return this.http.put<Camion>(`${this.api}/camion/${id}/remesas`, {}, { headers: this.getHeaders() })
    }

    cargarRemesa(id: string | undefined, remesaId: string | undefined): Observable<Camion> {
        return this.http.put<Camion>(`${this.api}/camion/${id}/remesas/${remesaId}/cargar`, {}, { headers: this.getHeaders() })
    }
}
