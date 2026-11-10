import { Component, inject, OnInit } from '@angular/core';
import { RemesaService } from '../../services/remesa';
import { Remesa } from '../../interfaces/remesa';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { barriosCiudades, Ciudad, ciudades } from '../../constants/ciudades';

@Component({
  selector: 'app-remesas',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './remesas.html',
  styleUrl: './remesas.css',
})
export class Remesas implements OnInit {
  private remesaService = inject(RemesaService);
  private fb = inject(FormBuilder);
  
  private configBarrios(): void {
    const barrioControl = this.remesaForm.get('barrioDestino');
    barrioControl?.disable();

    this.remesaForm.controls.ciudadDestino.valueChanges.subscribe((ciudad) => {
      barrioControl?.reset();

      if (ciudad && Object.hasOwn(barriosCiudades, ciudad )){
        this.barrios = barriosCiudades[ciudad as Ciudad]
        barrioControl?.enable();
      } else {
        this.barrios = []
        barrioControl?.disable();
      }
    })
  }

  remesas: Remesa[] = [];
  error: string = '';
  roleUser: string | null = sessionStorage.getItem('roleUser');
  ciudades = ciudades;
  barrios: readonly string[] = [];

  remesaForm = this.fb.group({
    codigo: ['', Validators.required],
    cantidad: ['', Validators.required],
    pesoTotal: ['', Validators.required],
    direccionDestino: ['', Validators.required],
    ciudadDestino: ['', Validators.required],
    tipoMercancia: ['', Validators.required],
    estado: [''],
    remitente: ['', Validators.required],
    destinatario: ['', Validators.required],
    ciudadOrigen: ['', Validators.required],
    barrioDestino: ['', Validators.required],
  });

  ngOnInit(): void {
    this.getAllRemesas();
    this.configBarrios();
  }

  getAllRemesas(): void {
    this.remesaService.getAllRemesas().subscribe({
      next: (res) => {
        this.remesas = res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  getRemesasPorEstado(estado: string): void {
    this.remesaService.getRemesasPorEstado(estado).subscribe({
      next: (res) => {
        this.remesas = res;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  createRemesa(): void {
    if (this.remesaForm.invalid) {
      this.remesaForm.markAsTouched();

      return;
    }

    this.remesaService.createRemesa(this.remesaForm.value as any).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Remesa creada',
          text: 'Remesa creada existosamente',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#3085d6',
        });

        this.getAllRemesas();
        this.remesaForm.reset();
      },
      error: (error) => {
        if (error.error?.errors) {
          error.error.errors.forEach((e: any) => {
            const control = this.remesaForm.get(e.path);
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
          title: 'Error al crear la remesa',
          text: this.error,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#d63030',
        });
      },
    });
  }

  deleteRemesa(id: string | undefined): void {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Vas a eliminar la remesa',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.remesaService.deleteRemesa(id).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Remesa eliminada',
              text: 'La remesa fue eliminada exitosamente',
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#3085d6',
            });

            this.getAllRemesas();
          },
          error: (error) => {
            if (error.error?.errors) {
              error.error.errors.forEach((e: any) => {
                const control = this.remesaForm.get(e.path);
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
              title: 'Error al eliminar la remesa',
              text: this.error,
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#d63030',
            });
          },
        });
      }
    });
  }
}
