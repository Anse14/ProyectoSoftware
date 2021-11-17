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
        ]
      }
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
