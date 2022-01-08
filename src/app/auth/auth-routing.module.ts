import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

// Componentes de AUTH
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



const routes: Routes = [
  /****  Rutas PUBLICAS Principales como hijas de app-routing.module.ts****/
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
