import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent {
  constructor(private router: Router) {}

  realizarDeposito(): void {
    this.router.navigate(['/deposito']);
  }

  realizarRetiro(): void {
    this.router.navigate(['/retiro']);
  }

  realizarTransferencia(): void {
    this.router.navigate(['/transferencia']);
  }
}