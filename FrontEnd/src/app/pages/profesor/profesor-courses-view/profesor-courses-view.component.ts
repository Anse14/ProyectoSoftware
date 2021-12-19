import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosService } from '@shared/services/cursos.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-profesor-courses-view',
  templateUrl: './profesor-courses-view.component.html',
  styleUrls: ['./profesor-courses-view.component.scss'],
})
export class ProfesorCoursesViewComponent implements OnInit {
  graphLoad = false;
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
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
    labels: [],
    datasets: [],
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public cursosService: CursosService
  ) {}

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    await this.cursosService.getCurso(id);
    let [labels, dataset] = await this.cursosService.getData();
    this.barChartData.labels = labels;
    this.barChartData.datasets = dataset;
    this.graphLoad = true;
  }

  goToRubricaCreation(id: String) {
    this.router.navigate(['/profesor/crear-rubrica', id]);
  }

  goToRubricaCalificar(id: String) {
    this.router.navigate(['/profesor/calificar-rubrica', id]);
  }
}
