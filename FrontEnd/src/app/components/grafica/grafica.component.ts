import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.scss'],
})
export class GraficaComponent implements OnInit {
  @Input()
  barChartOptions: ChartConfiguration['options'];
  @Input()
  barChartType: ChartType;
  @Input()
  barChartData: ChartData<'bar'>;

  constructor() {}

  ngOnInit(): void {}
}
