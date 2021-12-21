import { Injectable } from '@angular/core';
import { CalificaalumnoGQL } from '@graphql';

@Injectable({
  providedIn: 'root',
})
export class CalificacionService {
  constructor(private calificar: CalificaalumnoGQL) {}

  async calificate(nota, title, calificacionid, rubricauserid) {
    await this.calificar
      .mutate({
        NOTA: nota,
        DESC: title,
        CALIFICID: calificacionid,
        RUBUSERID: rubricauserid,
      })
      .toPromise();
  }
}
