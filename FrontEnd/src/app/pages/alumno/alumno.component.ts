import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  Alumno = "Alexender Schidmt"

  cursos = [
    {
      titulo: "CÓDIGO - Curso 1",
      rubrica: {
        titulo: "SISTEMA DE EVALUACIÓN",
        titulos: ["EXAMEN", "NOTA"],
        elementos: [
          ["PC1", 12],
          ["PC2", 15],
          ["PC3", 10.5],
          ["PC4", 20],
          ["P", "-"],
        ]
      }
    },
    {
      titulo: "CÓDIGO - Curso 2",
      rubrica: {
        titulo: "SISTEMA DE EVALUACIÓN",
        titulos: ["EXAMEN", "NOTA"],
        elementos: [
          ["PC1", 12],
          ["PC2", 15],
          ["PC3", 10.5],
          ["PC4", 20],
          ["P", "-"],
        ]
      }
    },
    {
      titulo: "CÓDIGO - Curso 3",
      rubrica: {
        titulo: "SISTEMA DE EVALUACIÓN",
        titulos: ["EXAMEN", "NOTA"],
        elementos: [
          ["PC1", 12],
          ["PC2", 15],
          ["PC3", 10.5],
          ["PC4", 20],
          ["P", "-"],
        ]
      }
    },
    {
      titulo: "CÓDIGO - Curso 4",
      rubrica: {
        titulo: "SISTEMA DE EVALUACIÓN",
        titulos: ["EXAMEN", "NOTA"],
        elementos: [
          ["PC1", 12],
          ["PC2", 15],
          ["PC3", 10.5],
          ["PC4", 20],
          ["P", "-"],
        ]
      }
    },
    {
      titulo: "CÓDIGO - Curso 5",
      rubrica: {
        titulo: "SISTEMA DE EVALUACIÓN",
        titulos: ["EXAMEN", "NOTA"],
        elementos: [
          ["PC1", 12],
          ["PC2", 15],
          ["PC3", 10.5],
          ["PC4", 20],
          ["P", "-"],
        ]
      }
    },
    {
      titulo: "CÓDIGO - Curso 6",
      rubrica: {
        titulo: "SISTEMA DE EVALUACIÓN",
        titulos: ["EXAMEN", "NOTA"],
        elementos: [
          ["PC1", 12],
          ["PC2", 15],
          ["PC3", 10.5],
          ["PC4", 20],
          ["P", "-"],
        ]
      }
    },
  ]

  type ='bar';

  dati=[
    {
      rubrica:{
        titulo: "COMPETENCIAS",
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
              'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)'
            ],
            borderWidth: 1
          },
        ],
      }
    },
  ]

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
          'rgba(54, 162, 235, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)'
        ],
        borderWidth: 1
      },
    ],
  };

  
  options = {
    responsive: true,
    maintainAspectRatio: true,
  };


  constructor() { }

  ngOnInit(): void {
  }

}
