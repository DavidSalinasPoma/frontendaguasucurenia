import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Servicios
import { AuthGuard } from './../guards/auth.guard';

// Componentes de PAGES
import { PagesComponent } from './pages.component';


const routes: Routes = [
  // Rutas PROTEGIDAS como hijas de app-routing.module.ts
  {
    // Cuando el path sea vacio va redireciones aun sub moduloComonenete
    path: 'dashboard', // ruta padre
    component: PagesComponent,
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
    // Definiendo rutas hijas de este modulo
    // children: [ // ruta hija depende del padre

    // ]
    loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class PagesRoutingModule { }
