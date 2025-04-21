import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/auth/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerError: string = '';
  isLoading: boolean = false; // <-- Añadido el estado de carga

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registerService: RegisterService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]{10,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  getFormControl(controlName: string): AbstractControl | null {
    return this.registerForm.get(controlName);
  }

  onRegister() {
    if (this.registerForm.invalid) {
      Object.values(this.registerForm.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }

    this.isLoading = true; // <-- Activar estado de carga
    this.registerError = '';

    const { username, email, tel, password } = this.registerForm.value;

    this.registerService.register({ username, email, tel, password }).subscribe({
      next: () => {
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        this.isLoading = false; // <-- Desactivar estado de carga en error
        this.registerError = error.message || 'Error en el registro. Por favor intente nuevamente.';
        console.error('Register error:', error);
      },
      complete: () => {
        this.isLoading = false; // <-- Desactivar estado de carga al completar
      }
    });
  }
}