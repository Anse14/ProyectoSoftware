import { Injectable } from '@angular/core';
import {
  Curso,
  GetallcursosGQL,
  GetCursoByPkGQL,
  GetCursoRubricasByPkGQL,
  GetcursosbycarreraGQL,
  GetDimensionUsuarioByRubricaUsuarioGQL,
  GetrubricasusuarioGQL,
  RubricaUsuarioByRubricaSeccionGQL,
} from '@graphql';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CursosService {
  curso: BehaviorSubject<Curso> = new BehaviorSubject<Curso>(null);
  cursos: Curso[] = [];

  constructor(
    private getCursoByPk: GetCursoByPkGQL,
    private getRubricasByCurso: GetCursoRubricasByPkGQL,
    private getCursosByCarrera: GetcursosbycarreraGQL,
    private getCursoRubricasByPk: GetCursoRubricasByPkGQL,
    private getrubricausuario: GetrubricasusuarioGQL,
    private getcursos: GetallcursosGQL,
    private rubrica_usuario_by_rubrica_seccion: RubricaUsuarioByRubricaSeccionGQL,
    private getDimensionUsuarioByRubricaUsuario: GetDimensionUsuarioByRubricaUsuarioGQL
  ) {}

  async getAllCursos() {
    this.cursos = [];
    let data = await this.getcursos.fetch().toPromise();

    this.cursos = [...data.data.curso];
  }

  getcursosbycarreraid(id: string) {
    this.getCursosByCarrera.fetch({ ID: id }).subscribe((data) => {
      this.cursos = data.data.carrera_by_pk.cursos;
    });
  }

  async getCurso(id: string) {
    let data = await this.getCursoRubricasByPk.fetch({ ID: id }).toPromise();

    for (let curso of this.cursos) {
      if (curso.id == id) {
        this.curso.next({ ...curso });
        this.curso.value.rubricas = data.data.curso_by_pk.rubricas;
        return;
      }
    }

    let dataCurso = await this.getCursoByPk.fetch({ ID: id }).toPromise();
    let curso: Curso = {
      ...dataCurso.data.curso_by_pk,
      rubricas: data.data.curso_by_pk.rubricas,
    };
    this.curso.next(curso);
    return;
  }

  async getData2(id: string) {
    var labels: string[] = [];
    var datagood: number[] = [];
    var databad: number[] = [];
    var integer: number = 1;
    labels.push('Rubrica ' + integer.toString());
    integer++;
    var god: number = 0;
    var bad: number = 0;

    let rubricasdata = await this.getrubricausuario
      .fetch({ ID: id })
      .toPromise();

    for (let rubricauser of rubricasdata.data.rubrica_usuario_by_rubrica) {
      const dimensionesdata = await this.getDimensionUsuarioByRubricaUsuario
        .fetch({ ID: rubricauser.id })
        .toPromise()
        .then((data) => {
          for (let dimuser of data.data.dimension_usuario_by_rubrica_usuario) {
            if (
              dimuser.descripcion == 'Bueno' ||
              dimuser.descripcion == 'Excelente'
            )
              god++;
            else bad++;
          }
        });
    }
    datagood.push(god);
    databad.push(bad);

    return [
      {
        data: datagood,
        label: 'Bueno - Excelente',
        backgroundColor: ['#C997C6', '#C997C6', '#C997C6', '#C997C6'],
      },
      {
        data: databad,
        label: 'En desarrollo - No aceptable',
        backgroundColor: ['#FFEE93', '#FFEE93', '#FFEE93', '#FFEE93'],
      },
    ];
  }

  async getgraficaofCursoPrototype1(seccionid: string) {
    var labels: string[] = [];
    var datagood: number[] = [];
    var databad: number[] = [];
    for (let i of this.curso.value.rubricas) {
      var integer: number = 1;
      labels.push('Rubrica ' + integer.toString());
      integer++;
      var god: number = 0;
      var bad: number = 0;
      let rubricasdata = await this.rubrica_usuario_by_rubrica_seccion
        .fetch({ ID: i.id, SECCIONID: seccionid })
        .toPromise();

      for (let rubricauser of rubricasdata.data
        .rubrica_usuario_by_rubrica_seccion) {
        for (let dimuser of rubricauser.dimensionUsuarios) {
          if (
            dimuser.descripcion == 'Bueno' ||
            dimuser.descripcion == 'Excelente'
          )
            god++;
          else bad++;
        }
      }
      datagood.push(god);
      databad.push(bad);
    }

    let datasets = [];
    datasets.push({
      data: datagood,
      label: 'Bueno - Excelente',
      backgroundColor: ['#C997C6', '#C997C6', '#C997C6', '#C997C6'],
    });
    datasets.push({
      data: databad,
      label: 'En desarrollo - No aceptable',
      backgroundColor: ['#FFEE93', '#FFEE93', '#FFEE93', '#FFEE93'],
    });

    return [labels, datasets];
  }

  async getdataofCurso(id: string) {
    var labels: string[] = [];
    var datagood: number[] = [];
    var databad: number[] = [];

    let data = await this.getRubricasByCurso.fetch({ ID: id }).toPromise();

    for (let rubrica of data.data.curso_by_pk.rubricas) {
      var integer: number = 1;
      labels.push('Rubrica ' + integer.toString());
      integer++;
      var god: number = 0;
      var bad: number = 0;

      let rubricasdata = await this.getrubricausuario
        .fetch({ ID: rubrica.id })
        .toPromise();

      for (let rubricauser of rubricasdata.data.rubrica_usuario_by_rubrica) {
        const dimensionesdata = await this.getDimensionUsuarioByRubricaUsuario
          .fetch({ ID: rubricauser.id })
          .toPromise();

        for (let dimuser of dimensionesdata.data
          .dimension_usuario_by_rubrica_usuario) {
          if (
            dimuser.descripcion == 'Bueno' ||
            dimuser.descripcion == 'Excelente'
          )
            god++;
          else bad++;
        }
      }
      datagood.push(god);
      databad.push(bad);
    }

    return [
      {
        data: datagood,
        label: 'Bueno - Excelente',
        backgroundColor: ['#C997C6', '#C997C6', '#C997C6', '#C997C6'],
      },
      {
        data: databad,
        label: 'En desarrollo - No aceptable',
        backgroundColor: ['#FFEE93', '#FFEE93', '#FFEE93', '#FFEE93'],
      },
    ];
  }

  filterCursosByRubrica() {
    var newcursos: Curso[] = [];
    for (let curso of this.cursos) {
      for (let rubrica of curso.rubricas) {
        if (rubrica.status == false) {
          newcursos.push(curso);
          break;
        }
      }
    }
    this.cursos = newcursos;
  }

  //////ESTA FUNCION DEBERIA ESTAR AQUI ?
  async getDimensionesUser(id: string) {
    console.log(id);
    return this.getDimensionUsuarioByRubricaUsuario
      .fetch({ ID: id })
      .toPromise();
  }
}
