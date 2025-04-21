import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User | null = null;

  constructor(private auth: Auth, private router: Router) {
    this.auth.onAuthStateChanged((user: User | null) => {
      this.user = user;
    });
  }

  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider);
      this.user = result.user;
      this.router.navigate(['/inicio']);
    } catch (error) {
      console.error('Error al iniciar sesión con Google', error);
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
      this.user = null;
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }

  isLoggedIn(): boolean {
    return this.user !== null;
  }

  loginWithGitHub() {
    const provider = new GithubAuthProvider();
    return signInWithPopup(this.auth, provider);
  }
}
