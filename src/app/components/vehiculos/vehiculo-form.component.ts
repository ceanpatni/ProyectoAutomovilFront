import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../../models/vehiculo.model';
import { VehiculoService } from '../../services/vehiculo.service';
import { MarcaService } from '../../services/marca.service';
import { PersonaService } from '../../services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vehiculo-form',
  templateUrl: './vehiculo-form.component.html'
})
export class VehiculoFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  isEdit = false;
  loading = false;
  error = '';
  marcas: any[] = [];
  personas: any[] = [];

  constructor(
    private fb: FormBuilder,
    private vehiculoService: VehiculoService,
    private marcaService: MarcaService,
    private personaService: PersonaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      modelo: ['', Validators.required],
      marca_id: [null, Validators.required],
      numero_puertas: [4, [Validators.required, Validators.min(1)]],
      color: [''],
      propietarios: [[]]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAux();
    if (this.id) {
      this.isEdit = true;
      this.vehiculoService.get(this.id).subscribe({
        next: (data) => {
          // adapt data to form fields
          this.form.patchValue({
            modelo: data.modelo,
            marca_id: data.marca_id || (data.marca_id ? (data.marca_id || data.marca_id) : null),
            numero_puertas: data.numero_puertas,
            color: data.color,
            propietarios: (data.propietarios || []).map((p:any)=>p.id ? p.id : p)
          });
        },
        error: () => this.error = 'Error al cargar vehículo'
      });
    }
  }

  loadAux(): void {
    this.marcaService.list().subscribe({ next: data => this.marcas = data });
    this.personaService.list().subscribe({ next: data => this.personas = data });
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const payload: Vehiculo = this.form.value;
    if (this.isEdit && this.id) {
      this.vehiculoService.update(this.id, payload).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/vehiculos']); },
        error: (e) => { this.loading = false; this.error = 'Error al actualizar' }
      });
    } else {
      this.vehiculoService.create(payload).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/vehiculos']); },
        error: (e) => { this.loading = false; this.error = 'Error al crear' }
      });
    }
  }
}
