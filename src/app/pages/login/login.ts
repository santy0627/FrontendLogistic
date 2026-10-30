import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  loading: boolean = false;
  error: string = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = '';

    this.authService.login(this.loginForm.value as any).subscribe({
      next: (res) => {
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso!',
          text: 'Has iniciado sesión correctamente',
          confirmButtonText: 'Entrar al sistema',
          confirmButtonColor: '#3085d6',
        }).then(() => {
          this.authService.saveTokenAndRole(res.token, res.roleUser);
          this.router.navigate(['/remesas']);
        });
      },
      error: (error) => {
        this.loading = false;

        if (error.error?.errors) {
          error.error.errors.forEach((e: any) => {
            const control = this.loginForm.get(e.path);
            if (control) {
              control.setErrors({ serverErrror: e.msg });
              control.markAsTouched();
            }
          });
          return;
        }

        this.error = error.error?.msg || 'Error al iniciar sesión.';

        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: this.error,
          confirmButtonText: 'Reintentar',
          confirmButtonColor: '#d63030',
        });
      },
    });
  }

  getFieldErrors(field: string): string | null {
    const control = this.loginForm.get(field);

    if (!control || !control.touched || !control.errors) return null;

    if (control.hasError('serverError')) return control.getError('serverError');

    return 'Campo invalido';
  }
}
