import { Injectable } from '@angular/core';
import { Carrera, GetdimensionusuariobyrubricausuarioGQL, GetrubricasusuarioGQL } from '@graphql';
import { Observable } from 'rxjs';
import { GetcarrerasGQL } from '@graphql';
import { of } from 'zen-observable';
import { GetcursosbycarreraGQL } from '@graphql';
import { Curso } from '@graphql';
import { GetrubricasbycursoGQL } from '@graphql';
import { Rubrica } from '@graphql';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class CalidadresultadosService {

  allcarreras: Carrera[] = [];

  cursosbycarrera: Curso[] = [];

  constructor(
    private carreras: GetcarrerasGQL,
    private cursos: GetcursosbycarreraGQL,
    private rubricas: GetrubricasbycursoGQL,
    private getrubricausuario: GetrubricasusuarioGQL,
    private getdimensionesusuario: GetdimensionusuariobyrubricausuarioGQL) {
    this.carreras.fetch().subscribe((data) =>
      this.allcarreras = data.data.carrera);
  }

  getcursosbycarreraid(id: string) {
    this.cursos.fetch({ ID: id }).subscribe((data) => {
      this.cursosbycarrera = data.data.carrera_by_pk.cursos;
    })
  }

  getcursobycursos(id: string) {
    var labels: string[] = [];
    var datagood: number[] = [];
    var databad: number[] = [];

    this.rubricas.fetch({ ID: id }).subscribe((data) => {
      for (let rubrica of data.data.curso_by_pk.rubricas) {
        var integer: number = 1;
        labels.push("Rubrica " + integer.toString());
        integer++;
        var god: number = 0;
        var bad: number = 0;
        this.getrubricausuario.fetch({ ID: rubrica.id }).subscribe(rubricasdata => {
          for (let rubricauser of rubricasdata.data.rubrica_usuario_by_rubrica) {
            this.getdimensionesusuario.fetch({ ID: rubricauser.id }).subscribe(dimensionesdata => {
              for (let dimuser of dimensionesdata.data.dimension_usuario_by_rubrica_usuario) {
                if (dimuser.descripcion == 'Bueno' || dimuser.descripcion == 'Excelente')
                  god++;
                else bad++
              }
            })
          }
        })
        datagood.push(god); // data
        databad.push(bad); // data
      }
    })
    this.barChartData.datasets.push({
      data: datagood,
      label: 'Bueno - Excelente',
      backgroundColor: ['#C997C6',
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
      {
        data: [], label: 'Bueno - Excelente', // Reemplazar por cantidad en cada competencia
        backgroundColor: [
          '#C997C6',
          '#C997C6',
          '#C997C6',
          '#C997C6',
          '#C997C6',
        ],
      },
      {
        data: [], label: 'En desarrollo - No aceptable',
        backgroundColor: [
          '#FFEE93',
          '#FFEE93',
          '#FFEE93',
          '#FFEE93',
          '#FFEE93',
        ],
      }
    ]
  };
}
