import { Component, inject, OnInit } from '@angular/core';
import { CamionService } from '../../services/camiones';
import { Camion } from '../../interfaces/camion';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Auth } from '../../services/auth';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-camiones',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './camiones.html',
  styleUrl: './camiones.css',
})
export class Camiones implements OnInit {

  private camionService = inject(CamionService);
  private fb = inject(FormBuilder);
  private authService = inject(Auth);

  camiones: Camion[] = [];
  users: User[] = [];
  error: string = ''
  roleUser: string | null = sessionStorage.getItem('roleUser')

  camionForm = this.fb.group({
    placa: ['', Validators.required],
    capacidadCarga: ['', Validators.required],
    disponible: [''],
    ubicacionActual: [''],
    remesasAsignadas: [''],
    conductorAsignado: ['']
  })

  ngOnInit(): void {
    this.getAllCamiones()
    this.getConductores()
  }

  getConductores(): void {
    this.authService.getUsersByRole('conductor').subscribe({
      next: (res) => {
        this.users = res
        console.log(res)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getAllCamiones(): void {
    this.camionService.getAllCamiones().subscribe({
      next: (res) => {
        this.camiones = res
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  createCamion() : void {
    if(this.camionForm.invalid){
      this.camionForm.markAsTouched()

      return
    }

    this.camionService.createCamion(this.camionForm.value as any).subscribe({
      next: (res) =>{

        Swal.fire({
          icon: 'success',
          title: 'Camión creado',
          text: 'Camión creado existosamente',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#3085d6'
        })

        this.getAllCamiones()
        this.camionForm.reset()
      },
      error: (error) => {

        if(error.error?.errors) {
          error.error.errors.forEach((e: any) => {
            const control = this.camionForm.get(e.path);
            if(control) {
              control.setErrors({ serverError: e.msg });
              control.markAsTouched();
            }
          });
          return
        }

        this.error = error.error?.msg || 'Error al crear';

        Swal.fire({
          icon: 'error',
          title: 'Error al crear el camión',
          text: this.error,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#d63030'
        })
  
      }
    })
  }

  deleteCamion(id: string | undefined): void {

    Swal.fire({
      title: "Estás seguro?",
      text: "Vas a eliminar el camion",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.camionService.deleteCamion(id).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Camión eliminado',
              text: 'El camión fue eliminado exitosamente',
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#3085d6'
            })

            this.getAllCamiones()
          },
          error: (error) => {

            if(error.error?.errors) {
              error.error.errors.forEach((e: any) => {
                const control = this.camionForm.get(e.path);
                if(control) {
                  control.setErrors({ serverError: e.msg });
                  control.markAsTouched();
                }
              });
              return
            }

            this.error = error.error?.msg || 'Error al eliminar';
            
            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar el camion',
              text: this.error,
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#d63030'
            })
          }
        })
    }
    });

  }

}
