import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo.model';
import { VehiculoService } from '../../services/vehiculo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehiculo-list',
  templateUrl: './vehiculo-list.component.html'
})
export class VehiculoListComponent implements OnInit {
  vehiculos: any[] = [];
  loading = false;
  error = '';

  constructor(private vehiculoService: VehiculoService, private router: Router) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.vehiculoService.list().subscribe({
      next: (data) => { this.vehiculos = data; this.loading = false; },
      error: () => { this.error = 'Error al cargar vehículos'; this.loading = false; }
    });
  }

  remove(id?: number): void {
    if (!id) return;
    if (!confirm('¿Eliminar este vehículo?')) return;
    this.vehiculoService.delete(id).subscribe(() => this.fetch());
  }

  edit(id?: number): void {
    if (!id) return;
    this.router.navigate(['/vehiculos/edit', id]);
  }

  add(): void {
    this.router.navigate(['/vehiculos/create']);
  }

  verPropietarios(id?: number): void {
    if (!id) return;
    this.router.navigate(['/vehiculos', id, 'propietarios']);
  }
}
