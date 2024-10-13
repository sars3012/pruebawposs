import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent {
  depositoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: PeticionesService,
    private dialog: MatDialog // Inyectar MatDialog
  ) {
    this.depositoForm = this.fb.group({
      cuenta_id: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.depositoForm.invalid) {
      return;
    }

    const cuenta_id = this.depositoForm.value.cuenta_id; // Obtener el valor de cuenta_id
    const monto = this.depositoForm.value.monto; // Obtener el valor de monto
    const token = localStorage.getItem('token'); // Obtener el token

    this.userService.depositar(cuenta_id, monto, token!).subscribe({
      next: (response) => {
        // Mostrar mensaje de éxito
        this.abrirDialogo(response.message); // Cambia esto dependiendo de cómo recibas el mensaje de éxito
      },
      error: (err) => {
        // Mostrar mensaje de error
        this.abrirDialogo(err.error.error || 'Error en el servidor');
      }
    });
  }

  abrirDialogo(mensaje: string): void {
    this.dialog.open(MensajeConfirmacionComponent, {
      data: { mensaje } // Pasar el mensaje al diálogo
    });
  }
}
