import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grafica-calidad',
  templateUrl: './grafica-calidad.component.html',
  styleUrls: ['./grafica-calidad.component.scss']
})
export class GraficaCalidadComponent implements OnInit {

  type = 'bar';
  data = {
    labels: ['Competencia 1', 'Competencia 2', 'Competencia 3', 'Competencia 4'],
    datasets: [
      {
        label: 'Excelente',
        data: [28, 72, 70, 26],
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(255, 99, 132)',
          'rgba(255, 99, 132)',
          'rgba(255, 99, 132)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)',
          'rgb(255, 99, 132)'
        ],
        borderWidth: 1
      },
      {
        label: 'En desarrollo',
        data: [30, 100, 32, 68],
        backgroundColor: [
          'rgba(255, 159, 64)',
          'rgba(255, 159, 64)',
          'rgba(255, 159, 64)',
          'rgba(255, 159, 64)'
        ],
        borderColor: [
          'rgba(255, 159, 64)',
          'rgba(255, 159, 64)',
          'rgba(255, 159, 64)',
          'rgba(255, 159, 64)'
        ],
        borderWidth: 1
      },
      {
        label: 'Deficiente',
        data: [42, 15, 60, 63],
        backgroundColor: [
          'rgba(0, 87, 128)',
          'rgba(0, 87, 128)',
          'rgba(0, 87, 128)',
          'rgba(0, 87, 128)'
        ],
        borderColor: [
          'rgba(0, 87, 128)',
          'rgba(0, 87, 128)',
          'rgba(0, 87, 128)',
          'rgba(0, 87, 128)'
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
