import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulo personalizados 
import { SharedModule } from '../shared/shared.module';
// Modulo de rutas
// import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

// componentes
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { PersonasComponent } from './recursoshumanos/personas/personas.component';
import { CrearPersonaComponent } from './recursoshumanos/personas/crear-persona/crear-persona.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    PersonasComponent,
    CrearPersonaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // AppRoutingModule,
    RouterModule
  ],
  exports: [ // Es para que otros modulos puedan utilizar estos componentes
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent
  ]
})
export class PagesModule { }
