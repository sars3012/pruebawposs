import { Component, OnInit } from '@angular/core';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-listar-usuario',
  templateUrl: './listar-usuario.component.html',
  styleUrls: ['./listar-usuario.component.css']
})
export class ListarUsuarioComponent {
  usuarios: any[] = []; // Array para almacenar los usuarios
  loading: boolean = true; // Indicar si está cargando los datos

  constructor(private peticionesService: PeticionesService) {}

  ngOnInit(): void {
    this.cargarUsuarios(); // Cargar usuarios al inicializar
  }

  // Método para cargar los usuarios
  cargarUsuarios(): void {
    const token = localStorage.getItem('token'); // Obtener el token de localStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log(headers)

    this.peticionesService.listarUsuarios(headers).subscribe(
      (response: any) => {
        this.usuarios = response; // Asignar la respuesta al array de usuarios
        this.loading = false; // Dejar de cargar
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
        this.loading = false; // Dejar de cargar incluso en error
      }
    );
  }

  // Método para editar usuario (puedes redirigir a otra página o abrir un modal)
  editarUsuario(usuarioId: string): void {
    // Lógica para editar usuario
    console.log('Editar usuario con ID:', usuarioId);
  }

  // Método para desactivar usuario
desactivarUsuario(usuarioId: string): void {
  const token = localStorage.getItem('token');
  console.log(usuarioId)
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  this.peticionesService.desactivarUsuario(usuarioId, headers).subscribe(
    (response) => {
      console.log('Usuario desactivado:', response);
      this.cargarUsuarios(); // Recargar la lista de usuarios
    },
    (error) => {
      console.error('Error al desactivar usuario:', error);
      if (error.status === 401) {
        console.error('Token inválido o no autorizado');
      }
    }
  );
}


  
}