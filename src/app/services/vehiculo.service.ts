import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Vehiculo } from '../models/vehiculo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private base = `${environment.apiBaseUrl}/vehiculos`;

  constructor(private http: HttpClient) { }

  list(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.base);
  }

  get(id: number): Observable<Vehiculo> {
    return this.http.get<Vehiculo>(`${this.base}/${id}`);
  }

  create(payload: Vehiculo): Observable<any> {
    return this.http.post<any>(this.base, payload);
  }

  update(id: number, payload: Vehiculo): Observable<any> {
    return this.http.put<any>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }

  addPropietarios(id: number, propietarios: number[]): Observable<any> {
    return this.http.post<any>(`${this.base}/${id}/propietarios`, { propietarios });
  }

  propietarios(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/${id}/propietarios`);
  }
}
