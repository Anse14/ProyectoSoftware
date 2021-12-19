import { Injectable } from '@angular/core';
import {
  Curso,
  GetCursoByPkGQL,
  GetCursoRubricasByPkGQL,
  GetDimensionUsuarioByRubricaUsuarioGQL,
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
    private getCursoRubricasByPk: GetCursoRubricasByPkGQL,
    private rubrica_usuario_by_rubrica_seccion: RubricaUsuarioByRubricaSeccionGQL,
    private getDimensionUsuarioByRubricaUsuario: GetDimensionUsuarioByRubricaUsuarioGQL
  ) {}

  async getCurso(id: string) {
    let data = await this.getCursoRubricasByPk.fetch({ ID: id }).toPromise();

    for (let curso of this.cursos) {
      if (curso.id == id) {
        this.curso.next(curso);
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

  async getData() {
    var labels: string[] = [];
    var datagood: number[] = [];
    var databad: number[] = [];

    var integer: number = 1;
    for (let i of this.curso.value.rubricas) {
      labels.push('Rubrica ' + integer.toString());
      integer++;
      var god: number = 0;
      var bad: number = 0;
      for (let sec of this.curso.value.secciones) {
        let rubricasdata = await this.rubrica_usuario_by_rubrica_seccion
          .fetch({ ID: i.id, SECCIONID: sec.id })
          .toPromise();
        for (let rubricauser of rubricasdata.data
          .rubrica_usuario_by_rubrica_seccion) {
          let dimensionesdata = await this.getDimensionUsuarioByRubricaUsuario
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
}
