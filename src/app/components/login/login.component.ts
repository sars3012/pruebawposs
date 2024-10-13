import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PeticionesService } from 'src/app/services/peticiones.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  errorMessage: string | null = null;

  constructor(private peticionesService: PeticionesService, private router: Router) {}

 // login.component.ts
onSubmit(loginForm: NgForm) {
  if (loginForm.invalid) {
    return;
  }

  const { correo, contraseña } = loginForm.value;

  // login.component.ts
this.peticionesService.login(correo, contraseña)
.subscribe(
  response => {
    console.log('Token recibido:', response.token);
    localStorage.setItem('token', response.token); // Guarda el token en el localStorage
    localStorage.setItem('rol', response.userData.rol_id);

    // Redirige según el rol
    if (response.userData.rol_id === 1) {
      this.router.navigate(['/admin']); // Rol de administrador
    } else {
      this.router.navigate(['/transaction']);
    }
  },
  error => {
    this.errorMessage = error.error.error;
  }
);
}
}
