import { Injectable } from '@angular/core';
import {
  Calificacion,
  Dimension,
  DimensionInput,
  DimensionSchemaInput,
  GetdimensionbypkGQL,
  GetrubricaGQL,
  InsertdimensionrubricaGQL,
  UpdatedimensionGQL,
} from '@graphql';
import { Rubrica } from '@shared/interfaces/rubrica';

@Injectable({
  providedIn: 'root',
})
export class UtilsfunctionsService {
  constructor(
    private getrubrica: GetrubricaGQL,
    private getcalicaciones: GetdimensionbypkGQL,
    private updatedimension: UpdatedimensionGQL,
    private inserdimension: InsertdimensionrubricaGQL
  ) {}

  rubrica: Rubrica = null;

  async updaterubrica(id: string) {
    var dimensionesid: string[] = [];
    this.rubrica = {
      id: '',
      actividadBase: '',
      ciclo: '',
      codigo: '',
      criterioDeDesempenho: '',
      numCritDesemp: '',
      evidencia: '',
      fecha: '',
      semana: '',
      semestre: '',
      status: null,
      tipo: '',
      dimensiones: ([] = []),
    };
    this.rubrica.id = id;

    let data = await this.getrubrica.fetch({ ID: id }).toPromise();

    this.rubrica.actividadBase = data.data.rubrica_by_pk.actividadBase;
    this.rubrica.ciclo = data.data.rubrica_by_pk.ciclo;
    this.rubrica.codigo = data.data.rubrica_by_pk.codigo;
    this.rubrica.criterioDeDesempenho =
      data.data.rubrica_by_pk.criterioDeDesempenho;
    this.rubrica.numCritDesemp = data.data.rubrica_by_pk.numCritDesemp;
    this.rubrica.semana = data.data.rubrica_by_pk.semana;
    this.rubrica.semestre = data.data.rubrica_by_pk.semestre;
    this.rubrica.status = data.data.rubrica_by_pk.status;
    this.rubrica.fecha = data.data.rubrica_by_pk.fecha;
    this.rubrica.tipo = data.data.rubrica_by_pk.tipo;

    for (let i of data.data.rubrica_by_pk.dimensiones) {
      dimensionesid.push(i.id);
    }

    for (let i = 0; i < dimensionesid.length; i++) {
      const data = await this.getcalicaciones
        .fetch({ ID: dimensionesid[i] })
        .toPromise();

    const titlearreglo = ['Excelente', 'Bueno', 'En desarrollo', 'No aceptable']

    const copy = [...data.data.dimension_by_pk.calificaciones].sort((a,b) => 
       titlearreglo.indexOf(a.titulo) - titlearreglo.indexOf(b.titulo)
      );

      const dimension = {...data.data.dimension_by_pk};

      dimension.calificaciones = copy;

      this.rubrica.dimensiones.push(dimension);
    }
    return this.rubrica;
  }

  UpdateDimension({
    puntaje,
    descripcion,
    title,
    bool,
    dimensionid,
  }: {
    puntaje: string;
    descripcion: string;
    title: string;
    bool: boolean;
    dimensionid: string;
  }): any {
    this.updatedimension
      .mutate({
        ID: dimensionid,
        NOTA: Number(puntaje),
        DESCRIPCION: descripcion,
        TITLE: title,
        OPTION: bool,
      })
      .subscribe((data) => {});
  }

  InsertDimension({
    rubricaid,
    dimensioninput,
    rubrica,
  }: {
    rubricaid: string;
    dimensioninput: DimensionSchemaInput;
    rubrica: Rubrica;
  }) {
    var dimension: any = {
      __typename: 'Dimension',
      id: '',
      descripcion: '',
      calificaciones: Array<Calificacion>(3),
    };
    this.inserdimension
      .mutate({ ID: rubricaid, DIMENSION: dimensioninput })
      .subscribe((data) => {
        dimension.id = data.data.update_rubrica_dimension_by_pk.id;
        dimension.descripcion = dimensioninput.descripcion;
        dimension.calificaciones =
          data.data.update_rubrica_dimension_by_pk.calificaciones;
        rubrica.dimensiones.push(dimension);
      });
    return rubrica;
  }
}
