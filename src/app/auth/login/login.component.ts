import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FacebookAuthProvider, signInWithPopup, Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private authService: AuthService,
    private auth: Auth
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.loginError = '';

    const loginData: LoginRequest = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.loginService.login(loginData).subscribe({
      next: () => {
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        this.isLoading = false;
        this.loginError = 'Credenciales incorrectas. Por favor intente nuevamente.';
        console.error('Login error:', error);
      },
      complete: () => {
        this.isLoading = false;
        this.loginForm.reset();
      }
    });
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().catch(() => {
      this.loginError = 'No se pudo iniciar sesión con Google.';
    });
  }

  loginWithFacebook() {
    const provider = new FacebookAuthProvider();
  
    signInWithPopup(this.auth, provider)
      .then((result) => {
        const user = result.user;
        console.log('Usuario autenticado con Facebook:', user);
        this.router.navigate(['/inicio']);
      })
      .catch((error) => {
        console.error('Error al iniciar sesión con Facebook:', error);
        this.loginError = 'Error al iniciar sesión con Facebook.';
      });
  }

  loginGitHub() {
    this.authService.loginWithGitHub()
      .then(userCredential => {
        console.log('Login exitoso con GitHub:', userCredential.user);
      })
      .catch(error => {
        console.error('Error de login con GitHub:', error);
        this.loginError = 'Error al iniciar sesión con GitHub.';
      });
  }
  
}
