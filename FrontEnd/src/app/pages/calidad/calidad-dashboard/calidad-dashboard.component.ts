import { Component, OnInit } from '@angular/core';
import { CalidadresultadosService } from '@shared/services/calidadresultados.service';

@Component({
  selector: 'app-calidad-dashboard',
  templateUrl: './calidad-dashboard.component.html',
  styleUrls: ['./calidad-dashboard.component.scss']
})
export class CalidadDashboardComponent implements OnInit {


    filtros = [
    {
      titulo: "Semestre",
      lista: ['2021-2'],
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

  constructor(public calidadresultados: CalidadresultadosService) { }

  ngOnInit(): void {
  }



}
