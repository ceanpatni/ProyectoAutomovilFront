import { Component, OnInit } from '@angular/core';
import { Persona } from '../../models/persona.model';
import { PersonaService } from '../../services/persona.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-persona-form',
  templateUrl: './persona-form.component.html'
})
export class PersonaFormComponent implements OnInit {
  form: FormGroup;
  id?: number;
  isEdit = false;
  loading = false;
  error = '';

  constructor(private fb: FormBuilder, private personaService: PersonaService, private route: ActivatedRoute, private router: Router) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      cedula: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.isEdit = true;
      this.personaService.get(this.id).subscribe({
        next: (data) => this.form.patchValue(data),
        error: () => this.error = 'Error al cargar la persona'
      });
    }
  }

  submit(): void {
    if (this.form.invalid) return;
    this.loading = true;
    const payload: Persona = this.form.value;
    if (this.isEdit && this.id) {
      this.personaService.update(this.id, payload).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/personas']); },
        error: () => { this.loading = false; this.error = 'Error al actualizar'; }
      });
    } else {
      this.personaService.create(payload).subscribe({
        next: () => { this.loading = false; this.router.navigate(['/personas']); },
        error: () => { this.loading = false; this.error = 'Error al crear'; }
      });
    }
  }
}
