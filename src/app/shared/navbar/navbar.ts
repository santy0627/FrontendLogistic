import { Component, DoCheck, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, Router} from '@angular/router';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements DoCheck{

  private authService = inject(Auth);
  private router = inject(Router);

  isAuthenticated: boolean = false;

  ngDoCheck(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  logout(): void{
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
