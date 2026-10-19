import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Auth } from '../../services/auth';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  loading: boolean = false;
  error: string = '';

  registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(1)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['', Validators.required]
  })

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return
    } 
    this.loading = true;
    this.error = '';

    this.auth.register(this.registerForm.value as any).subscribe({
      next: (res) => { 
        this.loading = false;

        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso!',
          text: 'Usuario registrado correctamente',
          confirmButtonText: 'Ir al Login',
          confirmButtonColor: '#3085d6'
        }).then(() => {
          this.router.navigate(['/login'])
        })
      },
      error: (error) => {
        this.loading = false;

        if(error.error?.errors) {
          error.error.errors.forEach((e: any) => {
            const control = this.registerForm.get(e.path);
            if(control) {
              control.setErrors({ serverError: e.msg });
              control.markAsTouched();
            }
          });
          return
        }

        this.error = error.error?.msg || 'Error al registrar';

        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: this.error,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#d63030'
        })

      }
    })
  }

  getFieldErrors(field: string) : string | null {
    const control = this.registerForm.get(field);

    if(!control || !control.errors || !control.touched) return null

    if(control.hasError('serverError')) return control.getError('serverError')

    return 'Campo invalido'
  }
}