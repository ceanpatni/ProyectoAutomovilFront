import { Component, OnInit } from '@angular/core';
import { Marca } from '../../models/marca.model';
import { MarcaService } from '../../services/marca.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html'
})
export class MarcaFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  isEdit = false;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private marcaService: MarcaService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      nombre_marca: ['', Validators.required],
      pais: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.marcaService.get(this.id).subscribe({
        next: (data) => this.form.patchValue(data),
        error: () => this.error = 'Error al cargar la marca'
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const payload: Marca = this.form.value;
    if (this.isEdit && this.id) {
      this.marcaService.update(this.id, payload).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/marcas']); },
        error: () => { this.loading = false; this.error = 'Error al actualizar'; }
      });
    } else {
      this.marcaService.create(payload).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/marcas']); },
        error: () => { this.loading = false; this.error = 'Error al crear'; }
      });
    }
  }
}
