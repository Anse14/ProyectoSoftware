import { Injectable } from '@angular/core';
import { GetdimensionbypkGQL, GetrubricaGQL, Rubrica } from '@graphql';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RubricaService {
  rubrica: BehaviorSubject<Rubrica> = new BehaviorSubject<Rubrica>(null);
  existdimensions = false;

  constructor(
    private getRubrica: GetrubricaGQL,
    private getDimensionByPk: GetdimensionbypkGQL
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

    return this.rubrica;
  }
}
