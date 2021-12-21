import { Component, OnInit } from '@angular/core';
import { CarreraService } from '@shared/services/carrera.service';
import { CursosService } from '@shared/services/cursos.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-calidad-dashboard',
  templateUrl: './calidad-dashboard.component.html',
  styleUrls: ['./calidad-dashboard.component.scss'],
})
export class CalidadDashboardComponent implements OnInit {
  filtros = [
    {
      titulo: 'Semestre',
      lista: ['2021-2'],
    },
  ];

  logros = [
    {
      titulo: 'Competencias',
      lista: ['RE 01', 'RE 02', 'RE 03', 'RE 04'],
    },
    {
      titulo: 'Niveles',
      lista: ['Nivel 1', 'Nivel 2', 'Nivel 3'],
    },
  ];

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = {
    labels: [], //Reemplazar por competencias o numero de la rubrica
    datasets: [
      {
        data: [],
        label: 'Bueno - Excelente', // Reemplazar por cantidad en cada competencia
        backgroundColor: [
          '#C997C6',
          '#C997C6',
          '#C997C6',
          '#C997C6',
          '#C997C6',
        ],
      },
      {
        data: [],
        label: 'En desarrollo - No aceptable',
        backgroundColor: [
          '#FFEE93',
          '#FFEE93',
          '#FFEE93',
          '#FFEE93',
          '#FFEE93',
        ],
      },
    ],
  };

  constructor(
    public carreraService: CarreraService,
    public cursosService: CursosService
  ) {}

  ngOnInit(): void {}

  async getdatacurso(id: string) {
    let data = await this.cursosService.getdataofCurso(id);

    for (let d of data) {
      this.barChartData.datasets.push(d);
    }
  }
}
