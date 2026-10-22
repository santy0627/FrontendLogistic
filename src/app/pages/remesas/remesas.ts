import { Component, inject, OnInit } from '@angular/core';
import { RemesaService } from '../../services/remesa';
import { Remesa } from '../../interfaces/remesa';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-remesas',
  imports: [CommonModule],
  templateUrl: './remesas.html',
  styleUrl: './remesas.css',
})

export class Remesas implements OnInit{

  private remesaService = inject(RemesaService);

  remesas: Remesa[] = [];

  ngOnInit(): void {
    this.getAllRemesas()
  }

  getAllRemesas(): void {
    this.remesaService.getAllRemesas().subscribe({
      next: (res) => {
        console.log(res)
        this.remesas = res
      },
      error: (error) => {
        console.error(error)
      }
    })
  }

}