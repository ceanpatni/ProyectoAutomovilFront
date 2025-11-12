import { Component, OnInit } from '@angular/core';
import { Marca } from '../../models/marca.model';
import { MarcaService } from '../../services/marca.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html'
})
export class MarcaListComponent implements OnInit {
  marcas: Marca[] = [];
  loading = false;
  error = '';

  constructor(private marcaService: MarcaService, private router: Router) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.loading = true;
    this.marcaService.list().subscribe({
      next: (data) => { this.marcas = data; this.loading = false; },
      error: (err) => { this.error = 'Error al cargar marcas'; this.loading = false; }
    });
  }

  remove(id?: number): void {
    if (!id) return;
    if (!confirm('¿Eliminar esta marca?')) return;
    this.marcaService.delete(id).subscribe(() => this.fetch());
  }

  edit(id?: number): void {
    if (!id) return;
    this.router.navigate(['/marcas/edit', id]);
  }

  add(): void {
    this.router.navigate(['/marcas/create']);
  }
}
