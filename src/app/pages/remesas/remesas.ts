import { Component, inject, OnInit } from '@angular/core';
import { RemesaService } from '../../services/remesa';
import { Remesa } from '../../interfaces/remesa';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validator, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-remesas',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './remesas.html',
  styleUrl: './remesas.css',
})

export class Remesas implements OnInit{

  private remesaService = inject(RemesaService);
  private fb = inject(FormBuilder)

  remesas: Remesa[] = [];

  remesaForm = this.fb.group({
    codigo: ['', Validators.required],
    cantidad: ['', Validators.required],
    pesoTotal: ['', Validators.required],
    direccionEntrega: ['', Validators.required],
    ciudadEntrega: ['', Validators.required],
    tipoMercancia: ['', Validators.required],
    estado: ['']
  })

  ngOnInit(): void {
    this.getAllRemesas()
  }

  getAllRemesas(): void {
    this.remesaService.getAllRemesas().subscribe({
      next: (res) => {
        this.remesas = res
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  getRemesasPorEstado(estado: string): void {
    this.remesaService.getRemesasPorEstado(estado).subscribe({
      next: (res) => {
        this.remesas = res
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  createRemesa() : void {
    if(this.remesaForm.invalid){
      this.remesaForm.markAsTouched()

      return
    }

    this.remesaService.createRemesa(this.remesaForm.value as any).subscribe({
      next: (res) =>{
        this.remesas.unshift(res)

        Swal.fire({
          icon: 'success',
          title: 'Remesa creada',
          text: 'Remesa creada existosamente',
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#3085d6'
        })
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

  deleteRemesa(id: string | undefined) : void {

    Swal.fire({
      title: "Estás seguro?",
      text: "Vas a eliminar la remesa",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.remesaService.deleteRemesa(id).subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Remesa eliminada',
              text: 'La remesa fue eliminada exitosamente',
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#3085d6'
            })
          },
          error: (error) => {
            console.error(error)
          }
        })

        Swal.fire({
        title: "Tarea eliminada!",
        text: "La tarea fue eliminada exitosamente",
        icon: "success"
      })
    }
    });

  }

}