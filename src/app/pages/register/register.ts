import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Auth } from '../../services/auth';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);

  loading: boolean = false;
  error: string = '';

  registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
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
        console.log(res)  
      },
      error: (error) => {
        this.error = error.error
        console.log(error.error.errors)
      }
    })
  }
} 