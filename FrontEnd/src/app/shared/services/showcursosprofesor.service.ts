import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Profesor } from '@shared/interfaces/profesor';
import { PROFESOR } from '@shared/mocksdata/mockProfesor';
import { Curso } from '@shared/interfaces/curso';
import { GetProfesorGQL } from '@graphql';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ShowcursosprofesorService {

  constructor(private getProfesor: GetProfesorGQL, private user: UserService) { }
  getProfesorCursos():Observable<Curso[]>{
    var curso: Curso[] = Array<Curso>();
    this.getProfesor.fetch({ID: this.user.user.codigo}).subscribe((data) => {
      console.log(data.data.profesor_by_pk.secciones);
      for (let i of data.data.profesor_by_pk.secciones){
        if (curso.includes(i.curso)){
          curso.push(i.curso);
        }
      }
      console.log(data);
    });
    return of(curso);
  }
}