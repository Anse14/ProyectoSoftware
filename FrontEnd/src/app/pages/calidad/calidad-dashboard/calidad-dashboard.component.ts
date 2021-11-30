import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calidad-dashboard',
  templateUrl: './calidad-dashboard.component.html',
  styleUrls: ['./calidad-dashboard.component.scss']
})
export class CalidadDashboardComponent implements OnInit {

    filtros = [
    {
      titulo: "Semestre",
      lista: ['2021-2', '2021-1'],
    },
    {
      titulo: "Carreras",
      lista: ['BIOINGENIERÍA', 
          'ADMINISTRACIÓN Y NEGOCIOS DIGITALES',
          'CIENCIA DE LA COMPUTACIÓN',
          'CIENCIA DE DATOS',
          'INGENIERÍA AMBIENTAL',
          'INGENIERÍA CIVIL',
          'INGENIERÍA ELECTRÓNICA',
          'INGENIERÍA DE LA ENERGÍA',
          'INGENIERÍA INDUSTRIAL',
          'INGENIERÍA MECÁNICA',
          'INGENIERÍA MECATRÓNICA',
          'INGENIERÍA QUÍMICA'],
      },
    {
      titulo: "Cursos",
      lista: ['Fisica 1',
        'Fisica 2',
        'Matematica 1',
        'Matematica 2',
        'Matematica Discreta 1',
        'Matematica Discreta 2',
        'Compiladores',
        'Teoria de la Computacion'],
    },
  ]

  logros = [
    {
      titulo: "Competencias",
      lista: ['RE 01', 'RE 02', 'RE 03', 'RE 04'],
    },
    {
      titulo: "Niveles",
      lista: ['Nivel 1', 'Nivel 2', 'Nivel 3'],
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
