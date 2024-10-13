import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MensajeConfirmacionComponent } from './shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/administrador/administrador.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { DepositoComponent } from './components/deposito/deposito.component';
import { RetiroComponent } from './components/retiro/retiro.component';
import { TranferenciaComponent } from './components/tranferencia/tranferencia.component';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';


@NgModule({
  declarations: [
    AppComponent,
    MensajeConfirmacionComponent,
    LoginComponent,
    AdminComponent,
    UsuarioComponent,
    TransaccionesComponent,
    DepositoComponent,
    RetiroComponent,
    TranferenciaComponent,
    ListarUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMenuModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
