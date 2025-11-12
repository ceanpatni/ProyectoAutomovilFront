import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Marca } from '../models/marca.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {
  private base = `${environment.apiBaseUrl}/marcas`;

  constructor(private http: HttpClient) { }

  list(): Observable<Marca[]> {
    return this.http.get<Marca[]>(this.base);
  }

  get(id: number): Observable<Marca> {
    return this.http.get<Marca>(`${this.base}/${id}`);
  }

  create(payload: Marca): Observable<Marca> {
    return this.http.post<Marca>(this.base, payload);
  }

  update(id: number, payload: Marca): Observable<Marca> {
    return this.http.put<Marca>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
