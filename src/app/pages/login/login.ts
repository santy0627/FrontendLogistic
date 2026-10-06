import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);

  loading: boolean = false;
  error: string = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  login() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return
    }
    this.loading = true;
    this.error = '';

    this.auth.login(this.loginForm.value as any).subscribe({
      next: (res) => {
        console.log(res)
      },
      error: (error) => {
        this.error = error.error
        console.log(error.error)
      }
    })
  }
}
