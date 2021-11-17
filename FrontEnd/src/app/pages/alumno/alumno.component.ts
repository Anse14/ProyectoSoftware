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
        titulos: ["EXAMEN", "PORCENTAJE", "NOTA", "ACUMULADO"],
        elementos: [
          ["PC1", "20%", 12, "2.4"],
          ["PC2", "20%", 15, "2.4"],
          ["PC3", "20%", 10.5, "2.4"],
          ["PC4", "20%", 20, "2.4"],
        ]
      }
    },
    {
      titulo: "CÓDIGO - Curso 2",
      rubrica: {
        titulo: "SISTEMA DE EVALUACIÓN",
        titulos: ["EXAMEN", "PORCENTAJE", "NOTA", "ACUMULADO"],
        elementos: [
          ["PC1", "20%", 12, "2.4"],
          ["PC2", "20%", 15, "2.4"],
          ["PC3", "20%", 10.5, "2.4"],
          ["PC4", "20%", 20, "2.4"],
        ]
      }
    },
    {
      titulo: "CÓDIGO - Curso 3",
      rubrica: {
        titulo: "SISTEMA DE EVALUACIÓN",
        titulos: ["EXAMEN", "PORCENTAJE", "NOTA", "ACUMULADO"],
        elementos: [
          ["PC1", "20%", 12, "2.4"],
          ["PC2", "20%", 15, "2.4"],
          ["PC3", "20%", 10.5, "2.4"],
          ["PC4", "20%", 20, "2.4"],
        ]
      }
    },
    {
      titulo: "CÓDIGO - Curso 4",
      rubrica: {
        titulo: "SISTEMA DE EVALUACIÓN",
        titulos: ["EXAMEN", "PORCENTAJE", "NOTA", "ACUMULADO"],
        elementos: [
          ["PC1", "20%", 12, "2.4"],
          ["PC2", "20%", 15, "2.4"],
          ["PC3", "20%", 10.5, "2.4"],
          ["PC4", "20%", 20, "2.4"],
        ]
      }
    },
    {
      titulo: "CÓDIGO - Curso 5",
      rubrica: {
        titulo: "SISTEMA DE EVALUACIÓN",
        titulos: ["EXAMEN", "PORCENTAJE", "NOTA", "ACUMULADO"],
        elementos: [
          ["PC1", "20%", 12, "2.4"],
          ["PC2", "20%", 15, "2.4"],
          ["PC3", "20%", 10.5, "2.4"],
          ["PC4", "20%", 20, "2.4"],
        ]
      }
    },
    {
      titulo: "CÓDIGO - Curso 6",
      rubrica: {
        titulo: "SISTEMA DE EVALUACIÓN",
        titulos: ["EXAMEN", "PORCENTAJE", "NOTA", "ACUMULADO"],
        elementos: [
          ["PC1", "20%", 12, "2.4"],
          ["PC2", "20%", 15, "2.4"],
          ["PC3", "20%", 10.5, "2.4"],
          ["PC4", "20%", 20, "2.4"],
        ]
      }
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
