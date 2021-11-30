import { Injectable } from '@angular/core';
import { Curso } from '@shared/interfaces/cursoborrable';
import { CURSOS } from '@shared/mocksdata/mockCursos';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Showcursoscalidad {

  constructor() { }

  getCursos():Observable<Curso[]>{
    const cursos = of(CURSOS);
    return cursos;
  }
  getCurso(id: number): Observable<Curso>{
    const curso = CURSOS.find( h => h.codigo?.toString == id.toString );
    return of(curso);
  }
}
