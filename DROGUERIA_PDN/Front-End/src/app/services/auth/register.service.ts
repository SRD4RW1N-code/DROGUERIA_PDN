import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject, tap, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  // BehaviorSubjects para manejar el estado del usuario (igual que en LoginService)
  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(private http: HttpClient) { 
    // Inicializa los BehaviorSubjects verificando si hay token en sessionStorage
    this.currentUserLoginOn = new BehaviorSubject<boolean>(sessionStorage.getItem("token") != null);
    this.currentUserData = new BehaviorSubject<string>(sessionStorage.getItem("token") || "");
  }

  /**
   * Método para registrar un nuevo usuario
   * @param userData Objeto con los datos del usuario a registrar
   */
  register(userData: {username: string, email: string, tel: string, password: string}): Observable<any> {
    return this.http.post<any>(`${environment.urlHost}auth/register`, userData).pipe(
      // Si el registro es exitoso, guardamos el token y actualizamos el estado
      tap((response) => {
        sessionStorage.setItem("token", response.token);
        this.currentUserData.next(response.token);
        this.currentUserLoginOn.next(true);
      }),
      // Mapeamos la respuesta para devolver solo el token
      map((response) => response.token),
      // Manejo de errores
      catchError(this.handleError)
    );
  }

  /**
   * Método para cerrar sesión (igual que en LoginService)
   */
  logout(): void {
    sessionStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  /**
   * Manejo de errores personalizado
   * @param error Error recibido
   * @returns Observable con el error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Ocurrió un error durante el registro';
    
    if (error.status === 0) {
      // Error de conexión
      console.error('Error de conexión:', error.error);
      errorMessage = 'No se pudo conectar al servidor. Verifique su conexión a internet.';
    } else {
      // Error del backend
      console.error(`Backend returned code ${error.status}, body was:`, error.error);
      
      // Mensajes específicos según el código de error
      if (error.status === 400) {
        errorMessage = 'Datos inválidos. Por favor verifique la información.';
      } else if (error.status === 409) {
        errorMessage = 'El usuario o correo electrónico ya está registrado.';
      } else if (error.status === 500) {
        errorMessage = 'Error interno del servidor. Por favor intente más tarde.';
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }

  // Getters para el estado del usuario (igual que en LoginService)

  get userData(): Observable<string> {
    return this.currentUserData.asObservable();
  }

  get userLoginOn(): Observable<boolean> {
    return this.currentUserLoginOn.asObservable();
  }

  get userToken(): string {
    return this.currentUserData.value;
  }
}