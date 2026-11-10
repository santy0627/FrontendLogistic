import { Component, DoCheck, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements DoCheck {
  private authService = inject(Auth);
  private router = inject(Router);

  isAuthenticated: boolean = false;
  roleUser: string | null = sessionStorage.getItem('roleUser');

  ngDoCheck(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.roleUser = sessionStorage.getItem('roleUser');
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
