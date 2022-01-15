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
import { UsuariosComponent } from './recursoshumanos/usuarios/usuarios.component';
import { CrearUsuariosComponent } from './recursoshumanos/usuarios/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from './recursoshumanos/usuarios/editar-usuarios/editar-usuarios.component';
import { EventosComponent } from './cobros/eventos/eventos.component';
import { CrearEventosComponent } from './cobros/eventos/crear-eventos/crear-eventos.component';
import { EditarEventosComponent } from './cobros/eventos/editar-eventos/editar-eventos.component';
import { ServiciosComponent } from './cobros/servicios/servicios.component';
import { CrearServiciosComponent } from './cobros/servicios/crear-servicios/crear-servicios.component';
import { EditarServiciosComponent } from './cobros/servicios/editar-servicios/editar-servicios.component';


const routes: Routes = [
  // Rutas PROTEGIDAS como hijas de app-routing.module.ts
  {
    // Cuando el path sea vacio va redireciones aun sub moduloComonenete
    path: 'dashboard', // ruta padre
    component: PagesComponent,
    canActivate: [AuthGuard],
    // Definiendo rutas hijas de este modulo
    children: [ // ruta hija depende del padre
      { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } }, // Path inicial
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica' } },

      // Recursos humanos
      { path: 'personas', component: PersonasComponent, data: { titulo: 'Personas del sistema' } },
      { path: 'crearpersonas', component: CrearPersonaComponent, data: { titulo: 'Registro de personas' } },

      { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios del sistema' } },
      { path: 'crearusuarios', component: CrearUsuariosComponent, data: { titulo: 'Registro de usuarios del sistema' } },
      { path: 'editarusuarios/:id', component: EditarUsuariosComponent, data: { titulo: 'Modificar Usuario' } },

      // Eventos y servicios
      { path: 'eventos', component: EventosComponent, data: { titulo: 'Eventos' } },
      { path: 'creareventos', component: CrearEventosComponent, data: { titulo: 'Registrar Eventos' } },
      { path: 'editareventos/:id', component: EditarEventosComponent, data: { titulo: 'Modificar evento' } },

      { path: 'servicios', component: ServiciosComponent, data: { titulo: 'Servicios' } },
      { path: 'crearservicios', component: CrearServiciosComponent, data: { titulo: 'Registro de Servicios' } },
      { path: 'editarservicios/:id', component: EditarServiciosComponent, data: { titulo: 'Modificar Servicios' } },

      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class PagesRoutingModule { }
