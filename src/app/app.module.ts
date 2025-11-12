import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MarcaListComponent } from './components/marcas/marca-list.component';
import { MarcaFormComponent } from './components/marcas/marca-form.component';
import { PersonaListComponent } from './components/personas/persona-list.component';
import { PersonaFormComponent } from './components/personas/persona-form.component';
import { VehiculoListComponent } from './components/vehiculos/vehiculo-list.component';
import { VehiculoFormComponent } from './components/vehiculos/vehiculo-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MarcaListComponent,
    MarcaFormComponent,
    PersonaListComponent,
    PersonaFormComponent,
    VehiculoListComponent,
    VehiculoFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
