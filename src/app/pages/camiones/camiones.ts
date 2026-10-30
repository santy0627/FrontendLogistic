import { Component, inject, OnInit } from '@angular/core';
import { CamionService } from '../../services/camiones';
import { Camion } from '../../interfaces/camion';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Auth } from '../../services/auth';
import { User } from '../../interfaces/user';
import { ciudades } from '../../constants/ciudades';
import { RemesaService } from '../../services/remesa';

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
  private remesaService = inject(RemesaService);

  camiones: Camion[] = [];
  users: User[] = [];
  error: string = '';
  roleUser: string | null = sessionStorage.getItem('roleUser');
  ciudades = ciudades;

  camionForm = this.fb.group({
    placa: ['', Validators.required],
    capacidadCarga: ['', Validators.required],
    disponible: [''],
    ubicacionActual: [''],
    remesasAsignadas: [''],
    conductorAsignado: [''],
    ciudadOperacion: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getAllCamiones();
    this.getConductores();
  }

  getConductores(): void {
    this.authService.getUsersByRole('conductor').subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getAllCamiones(): void {
    this.camionService.getAllCamiones().subscribe({
      next: (res) => {
        console.log(res);
        this.camiones = res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  createCamion(): void {
    if (this.camionForm.invalid) {
      this.camionForm.markAsTouched();

      return;
    }

    this.camionService.createCamion(this.camionForm.value as any).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Camión creado',
          text: 'Camión creado existosamente',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#3085d6',
        });

        this.getAllCamiones();
        this.camionForm.reset();
      },
      error: (error) => {
        if (error.error?.errors) {
          error.error.errors.forEach((e: any) => {
            const control = this.camionForm.get(e.path);
            if (control) {
              control.setErrors({ serverError: e.msg });
              control.markAsTouched();
            }
          });
          return;
        }

        this.error = error.error?.msg || 'Error al crear';

        Swal.fire({
          icon: 'error',
          title: 'Error al crear el camión',
          text: this.error,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#d63030',
        });
      },
    });
  }

  deleteCamion(id: string | undefined): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Vas a eliminar el camion',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.camionService.deleteCamion(id).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Camión eliminado',
              text: 'El camión fue eliminado exitosamente',
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#3085d6',
            });

            this.getAllCamiones();
          },
          error: (error) => {
            if (error.error?.errors) {
              error.error.errors.forEach((e: any) => {
                const control = this.camionForm.get(e.path);
                if (control) {
                  control.setErrors({ serverError: e.msg });
                  control.markAsTouched();
                }
              });
              return;
            }

            this.error = error.error?.msg || 'Error al eliminar';

            Swal.fire({
              icon: 'error',
              title: 'Error al eliminar el camion',
              text: this.error,
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#d63030',
            });
          },
        });
      }
    });
  }

  asignarRemesas(id: string | undefined): void {
    this.camionService.asignarRemesas(id).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Remesas asignadas',
          text: 'Se asignaron las remesas correctamente',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#3085d6',
        });

        this.getAllCamiones();
      },
      error: (error) => {
        if (error.error?.errors) {
          error.error.errors.forEach((e: any) => {
            const control = this.camionForm.get(e.path);
            if (control) {
              control.setErrors({ serverError: e.msg });
              control.markAsTouched();
            }
          });
          return;
        }

        this.error = error.error?.msg || 'Error al asignar';

        Swal.fire({
          icon: 'error',
          title: 'Error al asignar las remesas',
          text: this.error,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#d63030',
        });
      },
    });
  }

  cargarRemesa(id: string | undefined, remesaId: string | undefined): void {
    this.camionService.cargarRemesa(id, remesaId).subscribe({
      next: (res) => {
        this.getAllCamiones();
      },
      error: (error) => {
        if (error.error?.errors) {
          error.error.errors.forEach((e: any) => {
            const control = this.camionForm.get(e.path);
            if (control) {
              control.setErrors({ serverError: e.msg });
              control.markAsTouched();
            }
          });
          return;
        }

        this.error = error.error?.msg || 'Error al cargar';

        Swal.fire({
          icon: 'error',
          title: 'Error al cargar la remesa',
          text: this.error,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#d63030',
        });
      },
    });
  }
}
