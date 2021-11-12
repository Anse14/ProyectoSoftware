import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.scss'],
})
export class ProfessorDashboardComponent implements OnInit {
  cursos = [
    {
      color: '#FFDE59',
      codCurso: 'CS2901',
      nombreCurso: 'Ingenieria de Software I',
      horario: [
        'Aula 1 | Horario: Mar. 1-3pm Juev. 6-8pm',
        'Aula 2 | Horario: Mar. 1-3pm Juev. 6-8pm',
      ],
    },
    {
      color: '#5CE1E6',
      codCurso: 'CS2506',
      nombreCurso: 'Compiladores',
      horario: [
        'Aula 1 | Horario: Mar. 1-3pm Juev. 6-8pm',
        'Aula 2 | Horario: Mar. 1-3pm Juev. 6-8pm',
      ],
    },
    {
      color: '#C9E265',
      codCurso: 'GN0234',
      nombreCurso: 'Fisica 2',
      horario: [
        'Aula 1 | Horario: Mar. 1-3pm Juev. 6-8pm',
        'Aula 2 | Horario: Mar. 1-3pm Juev. 6-8pm',
      ],
    },
    {
      color: '#3F5BAE',
      codCurso: 'GN0124',
      nombreCurso: 'Laboratorio de Comunicacion I',
      horario: [
        'Aula 1 | Horario: Mar. 1-3pm Juev. 6-8pm',
        'Aula 2 | Horario: Mar. 1-3pm Juev. 6-8pm',
      ],
    },
    {
      color: '#C9E265',
      codCurso: 'GN0234',
      nombreCurso: 'Fisica 2',
      horario: [
        'Aula 1 | Horario: Mar. 1-3pm Juev. 6-8pm',
        'Aula 2 | Horario: Mar. 1-3pm Juev. 6-8pm',
      ],
    },
    {
      color: '#3F5BAE',
      codCurso: 'GN0124',
      nombreCurso: 'Laboratorio de Comunicacion I',
      horario: [
        'Aula 1 | Horario: Mar. 1-3pm Juev. 6-8pm',
        'Aula 2 | Horario: Mar. 1-3pm Juev. 6-8pm',
      ],
    },
    {
      color: '#C9E265',
      codCurso: 'GN0234',
      nombreCurso: 'Fisica 2',
      horario: [
        'Aula 1 | Horario: Mar. 1-3pm Juev. 6-8pm',
        'Aula 2 | Horario: Mar. 1-3pm Juev. 6-8pm',
      ],
    },
    {
      color: '#3F5BAE',
      codCurso: 'GN0124',
      nombreCurso: 'Laboratorio de Comunicacion I',
      horario: [
        'Aula 1 | Horario: Mar. 1-3pm Juev. 6-8pm',
        'Aula 2 | Horario: Mar. 1-3pm Juev. 6-8pm',
      ],
    },
    {
      color: '#C9E265',
      codCurso: 'GN0234',
      nombreCurso: 'Fisica 2',
      horario: [
        'Aula 1 | Horario: Mar. 1-3pm Juev. 6-8pm',
        'Aula 2 | Horario: Mar. 1-3pm Juev. 6-8pm',
      ],
    },
    {
      color: '#3F5BAE',
      codCurso: 'GN0124',
      nombreCurso: 'Laboratorio de Comunicacion I',
      horario: [
        'Aula 1 | Horario: Mar. 1-3pm Juev. 6-8pm',
        'Aula 2 | Horario: Mar. 1-3pm Juev. 6-8pm',
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
