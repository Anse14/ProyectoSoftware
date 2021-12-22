import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  Calificacion,
  DimensionSchemaInput,
  GetdimensionbypkGQL,
  GetrubricaGQL,
  InsertdimensionrubricaGQL,
  Rubrica,
  UpdatedimensionGQL,
  UpdaterubricaGQL,
} from '@graphql';
import { BehaviorSubject } from 'rxjs';
import { CursosService } from './cursos.service';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class RubricaService {
  rubrica: BehaviorSubject<Rubrica> = new BehaviorSubject<Rubrica>(null);
  existdimensions = false;

  constructor(
    private getRubrica: GetrubricaGQL,
    private getDimensionByPk: GetdimensionbypkGQL,
    private inserdimension: InsertdimensionrubricaGQL,
    private updatedimension: UpdatedimensionGQL,
    private saverubrica: UpdaterubricaGQL,
    private notificationService: NotificationService,
    private router: Router,
    private cursoService: CursosService
  ) {}

  async updateRubrica(id: string) {
    var dimensionesid: string[] = [];
    let data = await this.getRubrica.fetch({ ID: id }).toPromise();

    this.rubrica.next({
      id: id,
      actividadBase: data.data.rubrica_by_pk.actividadBase,
      ciclo: data.data.rubrica_by_pk.ciclo,
      codigo: data.data.rubrica_by_pk.codigo,
      criterioDeDesempenho: data.data.rubrica_by_pk.criterioDeDesempenho,
      numCritDesemp: data.data.rubrica_by_pk.numCritDesemp,
      evidencia: '',
      fecha: data.data.rubrica_by_pk.fecha,
      semana: data.data.rubrica_by_pk.semana,
      semestre: data.data.rubrica_by_pk.semestre,
      status: data.data.rubrica_by_pk.status,
      tipo: data.data.rubrica_by_pk.tipo,
      dimensiones: ([] = []),
      curso: { id: data.data.rubrica_by_pk.curso.id },
    });

    for (let i of data.data.rubrica_by_pk.dimensiones) {
      dimensionesid.push(i.id);
    }

    for (let i = 0; i < dimensionesid.length; i++) {
      const data = await this.getDimensionByPk
        .fetch({ ID: dimensionesid[i] })
        .toPromise();

      const titlearreglo = [
        'Excelente',
        'Bueno',
        'En desarrollo',
        'No aceptable',
      ];
      const copy = [...data.data.dimension_by_pk.calificaciones].sort(
        (a, b) =>
          titlearreglo.indexOf(a.titulo) - titlearreglo.indexOf(b.titulo)
      );

      const dimension = { ...data.data.dimension_by_pk };

      dimension.calificaciones = copy;

      this.rubrica.value.dimensiones.push(dimension);
    }

    if (this.rubrica.value.dimensiones.length > 0) {
      this.existdimensions = true;
    } else {
      this.existdimensions = false;
    }

    return this.rubrica.value;
  }

  async insertDimension(
    rubricaid: string,
    dimensioninput: DimensionSchemaInput,
    rubrica: Rubrica
  ) {
    var dimension: any = {
      __typename: 'Dimension',
      id: '',
      descripcion: '',
      calificaciones: Array<Calificacion>(3),
    };

    let data = await this.inserdimension
      .mutate({ ID: rubricaid, DIMENSION: dimensioninput })
      .toPromise();

    dimension.id = data.data.update_rubrica_dimension_by_pk.id;
    dimension.descripcion = dimensioninput.descripcion;
    dimension.calificaciones =
      data.data.update_rubrica_dimension_by_pk.calificaciones;
    rubrica.dimensiones.push(dimension);

    return rubrica;
  }

  async updateDimension(puntaje, descripcion, title, bool, dimensionid) {
    return await this.updatedimension
      .mutate({
        ID: dimensionid,
        NOTA: Number(puntaje),
        DESCRIPCION: descripcion,
        TITLE: title,
        OPTION: bool,
      })
      .toPromise();
  }

  async saveRubrica(rubricaId, userId) {
    let data = await this.saverubrica
      .mutate({ ID: rubricaId, ProfesorId: userId })
      .toPromise();
    if (data.data.update_rubrica_by_pk.valueOf() == true) {
      this.notificationService.success('Se guardo correctamente la rubrica');
      this.router.navigate([
        '/profesor/course-view',
        this.cursoService.curso.value.id,
      ]);
    }
  }
}
