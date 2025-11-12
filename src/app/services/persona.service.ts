import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Persona } from '../models/persona.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private base = `${environment.apiBaseUrl}/personas`;

  constructor(private http: HttpClient) { }

  list(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.base);
  }

  get(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.base}/${id}`);
  }

  create(payload: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.base, payload);
  }

  update(id: number, payload: Persona): Observable<Persona> {
    return this.http.put<Persona>(`${this.base}/${id}`, payload);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }

  vehiculos(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/${id}/vehiculos`);
  }
}
