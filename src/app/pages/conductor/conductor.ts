import { Component, inject, OnInit } from '@angular/core';
import { CamionService } from '../../services/camiones';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { User } from '../../interfaces/user';
import { Camion } from '../../interfaces/camion';

@Component({
  selector: 'app-conductor',
  imports: [CommonModule],
  templateUrl: './conductor.html',
  styleUrl: './conductor.css',
})
export class Conductor implements OnInit {

  private authService = inject(Auth);

  user: Omit<User, 'password'> | null = null
  camion: Camion | null = null

  getMe(): void {
    this.authService.getMe().subscribe({
      next: (res) => {
        console.log(res)
        this.user = res.user
        this.camion = res.camion
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
  
  ngOnInit(): void {
    this.getMe()
  }

}
