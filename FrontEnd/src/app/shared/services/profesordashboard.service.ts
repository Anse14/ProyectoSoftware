import { Injectable } from '@angular/core';
import { GetprofesorbyidGQL } from '@graphql';
import { Rubrica } from '@graphql';
import { Seccion } from '@graphql';
import { Curso } from '@graphql';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ProfesordashboardService {
  rubricas: Rubrica[] = [];
  cursos: Curso[] = [];

  constructor(private getProfesor: GetprofesorbyidGQL, 
    private user: UserService) { }
  getProfesorCursos() {
    this.getProfesor.fetch({ ID: this.user.user.id }).subscribe((data) => {
      let cursosMap = new Map();
      this.cursos = [];
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
      for(let curso of cursosMap.values()) {
        this.cursos.push(curso);
      }
    });
  }
}
