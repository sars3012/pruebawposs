import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { HttpHeaders } from '@angular/common/http';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdminComponent implements OnInit {
  transacciones: any[] = [];
  filteredTransacciones: any[] = [];
  filtro: string = '';

  constructor(private peticionesService: PeticionesService, public angularmaterial: AngularMaterialModule, private router: Router) {}

  ngOnInit(): void {
    this.getTransacciones();
  }

  getTransacciones() {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token no encontrado');
      return;
    }

    // Crear las cabeceras de la solicitud con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Añadir el token en la cabecera
    });

    // Llamar al método del servicio y pasar las cabeceras
    this.peticionesService.getTransacciones(headers)
      .subscribe(
        (response: any) => {
          this.transacciones = response.transacciones; // Capturar el array 'transacciones' del response
          this.filteredTransacciones = this.transacciones; // Mostrar todas las transacciones inicialmente
        },
        error => {
          console.error('Error al obtener transacciones', error);
        }
      );
  }

  aplicarFiltro() {
    if (this.filtro) {
      this.filteredTransacciones = this.transacciones.filter(transaccion =>
        transaccion.tipo.toLowerCase().includes(this.filtro.toLowerCase()) // Filtra por tipo de transacción
      );
    } else {
      this.filteredTransacciones = this.transacciones; // Si no hay filtro, mostrar todas las transacciones
    }
  }

  navigateToUsers(){
    this.router.navigate(['/lista']);
  }
}
