import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeticionesService {
  private urlApi = environment.api;

  constructor(private http: HttpClient) { }

  // Método para iniciar sesión
  public login(correo: string, contraseña: string): Observable<any> {
    return this.http.post<any>(`${this.urlApi}auth/login`, { correo, contraseña });
  }

  // Método para obtener transacciones, añadiendo el token en las cabeceras
  public getTransacciones(headers: HttpHeaders): Observable<any> {
    return this.http.get<any>(`${this.urlApi}transaccion/todas`, { headers });
  }

  // Método para registrar un nuevo usuario con el token Bearer en las cabeceras
  register(data: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // Incluir el token Bearer
    });

    return this.http.post(`${this.urlApi}auth/register`, data, { headers });
  }

  // Método para realizar un depósito
  public depositar(cuenta_id: string, monto: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.urlApi}transaccion/deposito`, { cuenta_id, monto }, { headers });
  }

  // Método para realizar un retiro
  public retirar(cuenta_id: string, monto: number, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.urlApi}transaccion/retiro`, { cuenta_id, monto }, { headers });
  }

    // Método para realizar una transferencia
    public realizarTransferencia(cuenta_id: string, cuentaDestino_id: string, monto: number, token: string): Observable<any> {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.http.post(`${this.urlApi}transaccion/transferencia`, { cuenta_id, cuentaDestino_id, monto }, { headers });
    }

      // Método para listar usuarios con el token Bearer en las cabeceras
    public listarUsuarios(headers: HttpHeaders): Observable<any> {
      return this.http.get<any>(`${this.urlApi}auth/usuarios`, { headers });
    }

      // Método para desactivar usuario
    desactivarUsuario(usuarioId: string, headers: HttpHeaders): Observable<any> {
      return this.http.put<any>(`${this.urlApi}auth/estado/${usuarioId}`, {}, { headers });
    }

}
