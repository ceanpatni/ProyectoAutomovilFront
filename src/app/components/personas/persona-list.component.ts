import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html'
})
export class PersonaListComponent implements OnInit {
  personas: Persona[] = [];
  loading = false;
  error = '';

  constructor(private personaService: PersonaService, private router: Router) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.personaService.list().subscribe({
      next: (data) => { this.personas = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar personas'; this.loading = false; }
    });
  }

  remove(id?: number): void {
    if (!id) return;
    if (!confirm('¿Eliminar esta persona?')) return;
    this.personaService.delete(id).subscribe(() => this.fetch());
  }

  edit(id?: number): void {
    if (!id) return;
    this.router.navigate(['/personas/edit', id]);
  }

  add(): void {
    this.router.navigate(['/personas/create']);
  }

  showVehiculos(id?: number): void {
    if (!id) return;
    this.router.navigate(['/personas', id, 'vehiculos']);
  }
}
