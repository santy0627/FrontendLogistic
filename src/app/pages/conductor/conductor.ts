import { Component, inject, OnInit } from '@angular/core';
import { CamionService } from '../../services/camiones';
import { CommonModule } from '@angular/common';
import { Auth } from '../../services/auth';
import { User } from '../../interfaces/user';
import { Camion } from '../../interfaces/camion';
import { RemesaService } from '../../services/remesa';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conductor',
  imports: [CommonModule],
  templateUrl: './conductor.html',
  styleUrl: './conductor.css',
})
export class Conductor implements OnInit {

  private authService = inject(Auth);
  private camionService = inject(CamionService);
  private remesaService = inject(RemesaService)

  user: Omit<User, 'password'> | null = null
  camion: Camion | null = null
  error: string = '';

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

  salirRuta(): void {
    const camionId = this.camion?._id;

    if (!camionId) {
      console.error('No se encontró el ID del camión');
      return;
    }

    this.camionService.salirRuta(camionId).subscribe({
      next: (respuesta) => {
        this.camion = respuesta;
        this.getMe()
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al salir a ruta',
          text: error.error?.msg || error.error?.message || 'No se pudo salir a ruta',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#d63030',
        });
      }
    });
  }

  entregarRemesa(id: string, estado: string):void {
    this.remesaService.updateRemesa(id, estado).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Remesas entregada',
          text: 'Se entregó la remesa correctamente',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#3085d6',
        });
        this.getMe()
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error al entregar la remesas',
          text: error.error?.msg || error.error?.message || 'No se pudo actualizar la remesa',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#d63030',
        });
      }
    })
  }
}
