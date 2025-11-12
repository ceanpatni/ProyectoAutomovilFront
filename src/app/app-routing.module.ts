import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarcaListComponent } from './components/marcas/marca-list.component';
import { MarcaFormComponent } from './components/marcas/marca-form.component';
import { PersonaListComponent } from './components/personas/persona-list.component';
import { PersonaFormComponent } from './components/personas/persona-form.component';
import { VehiculoListComponent } from './components/vehiculos/vehiculo-list.component';
import { VehiculoFormComponent } from './components/vehiculos/vehiculo-form.component';

const routes: Routes = [
  { path: '', redirectTo: 'marcas', pathMatch: 'full' },
  { path: 'marcas', component: MarcaListComponent },
  { path: 'marcas/create', component: MarcaFormComponent },
  { path: 'marcas/edit/:id', component: MarcaFormComponent },

  { path: 'personas', component: PersonaListComponent },
  { path: 'personas/create', component: PersonaFormComponent },
  { path: 'personas/edit/:id', component: PersonaFormComponent },
  { path: 'personas/:id/vehiculos', component: VehiculoListComponent }, 

  { path: 'vehiculos', component: VehiculoListComponent },
  { path: 'vehiculos/create', component: VehiculoFormComponent },
  { path: 'vehiculos/edit/:id', component: VehiculoFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
