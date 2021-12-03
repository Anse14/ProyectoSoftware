import { Injectable } from '@angular/core';
import { Seccion } from '@shared/interfaces/Seccion';
import { CURSOS } from '@shared/mocksdata/mockCursoData';
import { Curso } from '@shared/interfaces/curso';
import { Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosprofesorService {
 
  constructor() { }
  getProfesorCursos():Observable<Curso[]>{
    return of(CURSOS);
  }
}
