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

      // { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class PagesRoutingModule { }
