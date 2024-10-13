import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css']
})
export class RetiroComponent {
  retiroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: PeticionesService,
    private dialog: MatDialog
  ) {
    this.retiroForm = this.fb.group({
      cuenta_id: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(10000)]]
    });
  }

  onSubmit(): void {
    if (this.retiroForm.invalid) {
      return;
    }

    const token = localStorage.getItem('token');
    const headers = { 'Authorization': `Bearer ${token}` }; // Añadir el token en las cabeceras

    const cuenta_id = this.retiroForm.value.cuenta_id; // Obtén el cuenta_id
    const monto = this.retiroForm.value.monto; // Obtén el monto

    this.userService.retirar(cuenta_id, monto, token!).subscribe({
      next: (response) => {
        // Mostrar mensaje de éxito
        this.abrirDialogo(response.message);
      },
      error: (err) => {
        // Mostrar mensaje de error
        this.abrirDialogo(err.error.error || 'Error en el servidor');
      }
    });
  }

  abrirDialogo(mensaje: string): void {
    this.dialog.open(MensajeConfirmacionComponent, {
      data: { mensaje }
    });
  }
}
