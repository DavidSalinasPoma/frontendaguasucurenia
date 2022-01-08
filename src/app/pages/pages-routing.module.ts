import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Servicios
import { AuthGuard } from './../guards/auth.guard';

// Componentes de PAGES
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PersonasComponent } from './recursoshumanos/personas/personas.component';
import { CrearPersonaComponent } from './recursoshumanos/personas/crear-persona/crear-persona.component';


const routes: Routes = [
  // Rutas PROTEGIDAS como hijas de app-routing.module.ts
  {
    // Cuando el path sea vacio va redireciones aun sub moduloComonenete
    path: 'dashboard', // ruta padre
    component: PagesComponent,
    canActivate: [AuthGuard],
    // Definiendo rutas hijas de este modulo
    children: [ // ruta hija depende del padre
      { path: '', component: DashboardComponent }, // Path inicial
      { path: 'progress', component: ProgressComponent },
      { path: 'grafica1', component: Grafica1Component },

      // Recursos humanos
      { path: 'personas', component: PersonasComponent, data: { titulo: 'Personas del sistema' } },
      { path: 'crearpersonas', component: CrearPersonaComponent, data: { titulo: 'Registro de personas' } },

      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class PagesRoutingModule { }
