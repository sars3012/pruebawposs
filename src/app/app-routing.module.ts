import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/administrador/administrador.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { TransaccionesComponent } from './components/transacciones/transacciones.component';
import { DepositoComponent } from './components/deposito/deposito.component';
import { RetiroComponent } from './components/retiro/retiro.component';
import { TranferenciaComponent } from './components/tranferencia/tranferencia.component';
import { ListarUsuarioComponent } from './components/listar-usuario/listar-usuario.component';

const routes: Routes = [
  //Definimos las rutas a las que nos podemos mover
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'user', component: UsuarioComponent },
  { path: 'deposito', component: DepositoComponent },
  { path: 'retiro', component: RetiroComponent },
  { path: 'lista', component: ListarUsuarioComponent },
  { path: 'transaction', component: TransaccionesComponent},
  { path:'transferencia', component: TranferenciaComponent },
  { path: '', component: LoginComponent },
  { path: '**', component: LoginComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
