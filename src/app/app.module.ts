import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// Rutas
import { AppRoutingModule } from './app-routing.module';
// Sub Modulos de la APP
import { PagesModule } from './pages/pages.module';
// Mudulo de SHARED
import { AuthModule } from './auth/auth.module';

// Componentes de APP
import { AppComponent } from './app.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';


@NgModule({
  declarations: [
    AppComponent,
    NopagesfoundComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }
