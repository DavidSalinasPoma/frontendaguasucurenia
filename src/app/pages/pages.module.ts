import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modulo personalizados 
import { SharedModule } from '../shared/shared.module';
// Modulo de rutas
// import { AppRoutingModule } from '../app-routing.module';
import { RouterModule } from '@angular/router';

// Angular Material
import { MaterialModule } from '../material/material.module';

// Para generar pdf
import { NgxPrintModule } from 'ngx-print';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { EventosComponent } from './cobros/eventos/eventos.component';
import { ServiciosComponent } from './cobros/servicios/servicios.component';
import { CrearEventosComponent } from './cobros/eventos/crear-eventos/crear-eventos.component';
import { EditarEventosComponent } from './cobros/eventos/editar-eventos/editar-eventos.component';
import { EditarServiciosComponent } from './cobros/servicios/editar-servicios/editar-servicios.component';
import { CrearServiciosComponent } from './cobros/servicios/crear-servicios/crear-servicios.component';
import { BarriosComponent } from './recursoshumanos/barrios/barrios.component';
import { CrearBarrioComponent } from './recursoshumanos/barrios/crear-barrio/crear-barrio.component';
import { EditarBarrioComponent } from './recursoshumanos/barrios/editar-barrio/editar-barrio.component';
import { EditarPersonaComponent } from './recursoshumanos/personas/editar-persona/editar-persona.component';
import { SociosComponent } from './recursoshumanos/socios/socios.component';
import { CrearSocioComponent } from './recursoshumanos/socios/crear-socio/crear-socio.component';
import { EditarSocioComponent } from './recursoshumanos/socios/editar-socio/editar-socio.component';
import { ConsumoComponent } from './consumos/consumo/consumo.component';
import { LecturaComponent } from './consumos/lectura/lectura.component';
import { FacturaComponent } from './factura/factura.component';
import { DetalleComponent } from './factura/detalle/detalle.component';
import { FacturapagadasComponent } from './factura/facturapagadas/facturapagadas.component';
import { DetallepagadasComponent } from './factura/detallepagadas/detallepagadas.component';
import { ListaDirectivosComponent } from './directivo/lista-directivos/lista-directivos.component';
import { SocioxbarrioComponent } from './reportes/socioxbarrio/socioxbarrio.component';
import { ReportesComponent } from './reportes/reportes.component';
import { CrearReunionesComponent } from './reuniones/crear-reuniones/crear-reuniones.component';
import { ListaReunionesComponent } from './reuniones/lista-reuniones/lista-reuniones.component';
import { SociogeneralComponent } from './reportes/sociogeneral/sociogeneral.component';
import { DetallereunionesComponent } from './reuniones/detallereuniones/detallereuniones.component';
import { CobroxmesComponent } from './reportes/cobroxmes/cobroxmes.component';
import { ListamultasComponent } from './reuniones/listamultas/listamultas.component';
import { SociocobroComponent } from './reportes/sociocobro/sociocobro.component';
import { SocionocobroComponent } from './reportes/socionocobro/socionocobro.component';
import { ModalDeudoresComponent } from './reportes/socionocobro/modal-deudores/modal-deudores.component';


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
    EditarUsuariosComponent,
    EventosComponent,
    ServiciosComponent,
    CrearEventosComponent,
    EditarEventosComponent,
    EditarServiciosComponent,
    CrearServiciosComponent,
    BarriosComponent,
    CrearBarrioComponent,
    EditarBarrioComponent,
    EditarPersonaComponent,
    SociosComponent,
    CrearSocioComponent,
    EditarSocioComponent,
    ConsumoComponent,
    LecturaComponent,
    FacturaComponent,
    DetalleComponent,
    FacturapagadasComponent,
    DetallepagadasComponent,
    ListaDirectivosComponent,
    SocioxbarrioComponent,
    ReportesComponent,
    CrearReunionesComponent,
    ListaReunionesComponent,
    SociogeneralComponent,
    DetallereunionesComponent,
    CobroxmesComponent,
    ListamultasComponent,
    SociocobroComponent,
    SocionocobroComponent,
    ModalDeudoresComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    // AppRoutingModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPrintModule
  ],
  exports: [ // Es para que otros modulos puedan utilizar estos componentes
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    PersonasComponent,
    CrearPersonaComponent,
    UsuariosComponent,
    CrearUsuariosComponent,
    EditarUsuariosComponent,
    EventosComponent,
    ServiciosComponent,
    CrearEventosComponent,
    EditarEventosComponent,
    EditarServiciosComponent,
    CrearServiciosComponent,
    BarriosComponent,
    CrearBarrioComponent,
    EditarBarrioComponent,
    EditarPersonaComponent,
    SociosComponent,
    CrearSocioComponent,
    EditarSocioComponent,
    ConsumoComponent,
    LecturaComponent,
    FacturaComponent,
    DetalleComponent,
    FacturapagadasComponent,
    DetallepagadasComponent,
    ListaDirectivosComponent,
    SocioxbarrioComponent,
    ReportesComponent,
    SociogeneralComponent,
    DetallereunionesComponent,
    CobroxmesComponent,
    SociocobroComponent,
    SocionocobroComponent
  ]
})
export class PagesModule { }
