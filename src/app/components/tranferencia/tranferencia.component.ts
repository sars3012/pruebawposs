import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PeticionesService } from 'src/app/services/peticiones.service';
import { MensajeConfirmacionComponent } from 'src/app/shared/mensaje-confirmacion/mensaje-confirmacion.component';

@Component({
  selector: 'app-tranferencia',
  templateUrl: './tranferencia.component.html',
  styleUrls: ['./tranferencia.component.css']
})
export class TranferenciaComponent {
  transferenciaForm: FormGroup;

  constructor(private fb: FormBuilder, private peticionesService: PeticionesService,
    private dialog: MatDialog) {
    // Inicializar el formulario
    this.transferenciaForm = this.fb.group({
      cuenta_id: ['', Validators.required],
      cuentaDestino_id: ['', Validators.required],
      monto: ['', [Validators.required, Validators.min(10000)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.transferenciaForm.valid) {
      const token = localStorage.getItem('token'); // Obtener el token de localStorage o donde lo guardes

      // Asegúrate de que el token no sea nulo
      if (!token) {
        alert('Token no encontrado. Por favor, inicie sesión nuevamente.');
        return;
      }

      const { cuenta_id, cuentaDestino_id, monto } = this.transferenciaForm.value; // Extraer valores del formulario
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });

      this.peticionesService.realizarTransferencia(cuenta_id, cuentaDestino_id, monto, token).subscribe(
        response => {
          this.abrirDialogo(response.message);
          this.transferenciaForm.reset(); // Reiniciar el formulario
        },
        error => {
          this.abrirDialogo(error.error.message || 'Error en la transferencia');
        }
      );
    }
  }
  abrirDialogo(mensaje: string): void {
    this.dialog.open(MensajeConfirmacionComponent, {
      data: { mensaje }
    });
  }
}