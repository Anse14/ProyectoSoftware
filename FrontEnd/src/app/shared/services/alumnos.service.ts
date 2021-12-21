import { Injectable } from '@angular/core';
import {
  Alumno,
  RubricaUsuario,
  RubricaUsuarioByRubricaSeccionGQL,
} from '@graphql';
import { CursosService } from './cursos.service';
import { RubricaService } from './rubrica.service';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  alumnos: RubricaUsuario[] = [];

  constructor(
    private cursoService: CursosService,
    private rubricaService: RubricaService,
    private getalumnos: RubricaUsuarioByRubricaSeccionGQL
  ) {}

  async getAlumnos() {
    let alumnosMap = new Map();
    this.alumnos = [];

    for (let curso of this.cursoService.curso.value?.secciones) {
      let data = await this.getalumnos
        .fetch({
          ID: this.rubricaService.rubrica.value.id,
          SECCIONID: curso.id,
        })
        .toPromise();

      data.data.rubrica_usuario_by_rubrica_seccion?.forEach((ru) => {
        alumnosMap.set(ru.alumno.id, {...ru});
      });
    }

    alumnosMap.forEach((key, value) => {
      this.alumnos.push(value);
    });
  }
}
