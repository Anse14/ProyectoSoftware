import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.scss'],
})
export class CoursesViewComponent implements OnInit {
  semanas = [
    { titulo: 'Semana 1' },
    { titulo: 'Semana 2' },
    { titulo: 'Semana 3' },
    { titulo: 'Semana 4' },
    { titulo: 'Semana 5' },
    { titulo: 'Semana 6' },
    { titulo: 'Semana 7' },
    { titulo: 'Semana 8' },
    { titulo: 'Semana 9' },
    { titulo: 'Semana 10' },
    { titulo: 'Semana 11' },
    { titulo: 'Semana 12' },
    { titulo: 'Semana 13' },
    { titulo: 'Semana 14' },
    { titulo: 'Semana 15' },
    { titulo: 'Semana 16' },
  ];

  evaluaciones_semanales = [
    { titulo: 'Laboratorio' },
    { titulo: 'Quiz' },
    { titulo: 'Tarea' },
  ];

  type = 'bar';
  dati = [
    {
      rubrica: {
        titulo: 'COMPETENCIAS',
        labels: ['PC1', 'PC2', 'PC3', 'PC4', 'P'],
        datasets: [
          {
            label: 'Progreso',
            data: [12, 15, 10.5, 20, 0],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
            ],
            borderWidth: 1,
          },
        ],
      },
    },
  ];

  data = {
    labels: ['PC1', 'PC2', 'PC3', 'PC4', 'P'],
    datasets: [
      {
        label: 'Progreso',
        data: [12, 15, 10.5, 20, 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        borderWidth: 1,
      },
    ],
  };

  options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  secciones = [
    {
      titulo: 'Seccion 1',
      horario: {
        dia1: 'MAR',
        hora1: '6 - 8pm',
        dia2: 'MIE',
        hora2: '1 - 3pm',
      },
    },

    {
      titulo: 'Seccion 2',
      horario: {
        dia1: 'JUV',
        hora1: '3 - 5pm',
        dia2: 'MIE',
        hora2: '9 - 11am',
      },
    },
  ];

  codCurso: string;
  nombreCurso: string;
  expandedIndex = 0;
  constructor(private router: Router) {
    this.codCurso = this.router.getCurrentNavigation().extras.state.codCurso;
    this.nombreCurso =
      this.router.getCurrentNavigation().extras.state.nombreCurso;
  }

  ngOnInit(): void {}
}
