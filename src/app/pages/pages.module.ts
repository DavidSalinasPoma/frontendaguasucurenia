import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulo personalizados 
import { SharedModule } from '../shared/shared.module';
// Modulo de rutas
// import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

// Angular Material
import { MaterialModule } from '../material/material.module';

// componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PersonasComponent } from './recursoshumanos/personas/personas.component';
import { CrearPersonaComponent } from './recursoshumanos/personas/crear-persona/crear-persona.component';
import { UsuariosComponent } from './recursoshumanos/usuarios/usuarios.component';
import { CrearUsuariosComponent } from './recursoshumanos/usuarios/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from './recursoshumanos/usuarios/editar-usuarios/editar-usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    PersonasComponent,
    CrearPersonaComponent,
    UsuariosComponent,
    CrearUsuariosComponent,
    EditarUsuariosComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // AppRoutingModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ // Es para que otros modulos puedan utilizar estos componentes
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ]
})
export class PagesModule { }
