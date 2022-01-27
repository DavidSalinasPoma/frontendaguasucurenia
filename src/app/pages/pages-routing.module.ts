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
import { BarriosComponent } from './recursoshumanos/barrios/barrios.component';
import { CrearBarrioComponent } from './recursoshumanos/barrios/crear-barrio/crear-barrio.component';
import { EditarBarrioComponent } from './recursoshumanos/barrios/editar-barrio/editar-barrio.component';
import { EditarPersonaComponent } from './recursoshumanos/personas/editar-persona/editar-persona.component';
import { SociosComponent } from './recursoshumanos/socios/socios.component';
import { EditarSocioComponent } from './recursoshumanos/socios/editar-socio/editar-socio.component';
import { CrearSocioComponent } from './recursoshumanos/socios/crear-socio/crear-socio.component';
import { ConsumoComponent } from './consumos/consumo/consumo.component';
import { LecturaComponent } from './consumos/lectura/lectura.component';


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
      { path: 'personas', component: PersonasComponent, data: { titulo: 'Lista de personas registradas' } },
      { path: 'crearpersonas', component: CrearPersonaComponent, data: { titulo: 'Registro de personas' } },
      { path: 'editarpersonas/:id', component: EditarPersonaComponent, data: { titulo: 'Modificar Persona' } },

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

      { path: 'barrios', component: BarriosComponent, data: { titulo: 'Barrios' } },
      { path: 'crearbarrios', component: CrearBarrioComponent, data: { titulo: 'Registro de Barrios' } },
      { path: 'editarbarrios/:id', component: EditarBarrioComponent, data: { titulo: 'Modificar Barrios' } },

      { path: 'socios', component: SociosComponent, data: { titulo: 'Socios' } },
      { path: 'crearsocios', component: CrearSocioComponent, data: { titulo: 'Registro de Socios' } },
      { path: 'editarsocios/:id', component: EditarSocioComponent, data: { titulo: 'Modificar Socios' } },

      { path: 'consumos', component: ConsumoComponent, data: { titulo: 'Consumo de agua potable' } },
      { path: 'lecturas/:id', component: LecturaComponent, data: { titulo: 'Lectura medidor' } },


      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class PagesRoutingModule { }
