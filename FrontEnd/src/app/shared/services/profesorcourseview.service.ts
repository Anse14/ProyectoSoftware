import { Injectable, ɵɵngDeclareClassMetadata } from '@angular/core';
import { GetdimensionusuariobyrubricausuarioGQL, GetrubricasbycursoGQL, GetrubricasusuarioGQL, RubricausuariobyrubricaseccionGQL } from '@graphql';
import { Curso } from '@graphql';
import { ProfesordashboardService } from './profesordashboard.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class CourseviewService {

  constructor(
    public getCurso: ProfesordashboardService,
    private getRubricas: GetrubricasbycursoGQL,
    private getDimensionesUsuarios: GetdimensionusuariobyrubricausuarioGQL,
    private getRubricasUsuarios: RubricausuariobyrubricaseccionGQL) { }

  getRubricasCurso(id: string): void {
    this.getRubricas.fetch({ ID: id }).subscribe((data) => {
      for (let i of this.getCurso.cursos) {
        if (i.id == id) {
          this.curso = i;
          this.curso.rubricas = data.data.curso_by_pk.rubricas;
          this.available = true;
          this.getdata();
        }
      }
    })
    //this.getRubricas.fetch({ ID: "bf700373-dfcf-42c3-b9e8-2f1e2557cda3" }).subscribe((data) => {
    //  this.curso.rubricas = data.data.curso_by_pk.rubricas;
    //  console.log(this.curso.rubricas);
    //})
  }
  available = false;
  curso: Curso = null;
  graphicready = false;

  getdata(): void {
    var labels: string[] = [];
    var datagood: number[] = [];
    var databad: number[] = [];

    var integer: number = 1;
    for (let i of this.curso.rubricas) {
      labels.push("Rubrica " + integer.toString());
      integer++;
      var god: number = 0;
      var bad: number = 0;
      for (let sec of this.curso.secciones) {
        this.getRubricasUsuarios.fetch({ ID: i.id, SECCIONID: sec.id }).subscribe(rubricasdata => {
          for (let rubricauser of rubricasdata.data.rubrica_usuario_by_rubrica_seccion) {
            this.getDimensionesUsuarios.fetch({ ID: rubricauser.id }).subscribe(dimensionesdata => {
              for (let dimuser of dimensionesdata.data.dimension_usuario_by_rubrica_usuario) {
                if (dimuser.descripcion == 'Bueno' || dimuser.descripcion == 'Excelente')
                  god++;
                else bad++
              }
              
            })
          }
          this.graphicready = true;
        })
      }
      datagood.push(god); // data
      databad.push(bad); // data
    }
    this.barChartData.labels = labels;
    this.barChartData.datasets.push({
      data: datagood,
      label: 'Bueno - Excelente',
      backgroundColor: [
        '#C997C6',
        '#C997C6',
        '#C997C6',
        '#C997C6',]
    });
    this.barChartData.datasets.push({
      data: databad,
      label: 'En desarrollo - No aceptable',
      backgroundColor: [
        '#FFEE93',
        '#FFEE93',
        '#FFEE93',
        '#FFEE93',
      ],
    });

  }


  //GRAPHIC
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  barChartType: ChartType = 'bar';
  barChartData: ChartData<'bar'> = {
    labels: [], //Reemplazar por competencias o numero de la rubrica
    datasets: [
    ] 
  };
}
