// Este modulo va a estar enfocado en las rutas
import { NgModule } from '@angular/core';

// Importar los indispensable
import { RouterModule, Routes } from '@angular/router';
// Rutas hijas
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

// Componentes
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';



// Configurar las rutas de la APP
const routes: Routes = [

  // Si es un path vacio va a redirecionar a -> dashboard y esto a un -> path: '', component: DashboardComponent
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // Cualquiera otra ruta que no este definida en este routing va a mostrar NoPagesFound
  { path: '**', component: NopagesfoundComponent }
  /**Fin rutas hijas principales */

]


@NgModule({
  declarations: [],
  imports: [
    // Es para implementar rutas PRINCIPALES
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [
    RouterModule // Se exporta para que otro modulo pueda disponer de este routing
  ]
})
export class AppRoutingModule { }
