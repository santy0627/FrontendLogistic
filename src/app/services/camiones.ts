import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Camion } from '../interfaces/camion';

@Injectable({
    providedIn: 'root',
})

export class CamionService {
    private http = inject(HttpClient);

    private getHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token')

        return new HttpHeaders({
            Authorization: `Bearer ${token}`
        })
    }

    getAllCamiones() : Observable<Camion[]> {
        return this.http.get<Camion[]>('http://localhost:3000/api/camion', { headers: this.getHeaders() })
    }

    createCamion(camion : any) : Observable<Camion> {
        return this.http.post<Camion>('http://localhost:3000/api/camion', camion, { headers: this.getHeaders() })
    }

    updateCamion(id: string, camion: any) : Observable<Camion> {
        return this.http.put<Camion>(`http://localhost:3000/api/camion/${id}`, camion, { headers: this.getHeaders() })
    }

    deleteCamion(id: string | undefined) : Observable<Camion> {
        return this.http.delete<Camion>(`http://localhost:3000/api/camion/${id}`,{ headers: this.getHeaders() })
    }
}
