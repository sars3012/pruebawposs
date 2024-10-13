// usuario.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: PeticionesService,
    private router: Router // Inyectar el servicio de enrutamiento
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      identificacion: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(8)]],
      rol_id: [0, Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }
  
    const userData = { ...this.registerForm.value, rol_id: Number(this.registerForm.value.rol_id) }; // Convertir rol_id a número
    const token = localStorage.getItem('token'); // Asumiendo que el token se guarda en localStorage
  
    if (!token) {
      console.error('Token no encontrado');
      return; // Opcional: manejar el caso en que no haya token
    }
  
    this.userService.register(userData, token).subscribe({
      next: (response) => {
        console.log('Usuario registrado:', response);
        // Redirigir a otra página después del registro si es necesario
        this.router.navigate(['/ruta-a-donde-redirigir']); // Ajusta la ruta
      },
      error: (err) => {
        console.error('Error al registrar el usuario:', err);
        // Manejo de errores, mostrar mensaje al usuario, etc.
      }
    });
  }  
}
