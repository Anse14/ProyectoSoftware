import { Injectable } from '@angular/core';
import { Curso, GetprofesorbyidGQL, Profesor, Seccion } from '@graphql';
import { CursosService } from './cursos.service';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfesorService {
  profesor = new BehaviorSubject<Profesor>(null);

  constructor(
    private cursosService: CursosService,
    private userService: UserService,
    private getProfesorById: GetprofesorbyidGQL
  ) {}

  async getProfesor() {
    let data = await this.getProfesorById
      .fetch({ ID: 'd3fbb877-a7f6-4524-8e8e-d73392580654' })
      .toPromise();
    let cursosMap = new Map();
    this.cursosService.cursos = [];

    for (let seccion of data.data.profesor_by_pk.secciones) {
      if (!cursosMap.has(seccion.curso.codigo)) {
        let curso: Curso = {
          id: seccion.curso.id,
          codigo: seccion.curso.codigo,
          nombre: seccion.curso.nombre,
          secciones: [],
          rubricas: [],
        };
        cursosMap.set(seccion.curso.codigo, curso);
      }

      let curso = cursosMap.get(seccion.curso.codigo);
      let newSeccion: Seccion = {
        codigo: seccion.codigo,
        id: seccion.id,
      };
      curso.secciones.push(newSeccion);
    }

    for (let curso of cursosMap.values()) {
      this.cursosService.cursos.push(curso);
    }

    this.profesor.next(data.data.profesor_by_pk);
  }
}
