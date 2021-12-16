import { Injectable } from '@angular/core';
import { Rubrica, RubricausuariobyrubricaseccionGQL } from '@graphql';
import { Alumno } from '@graphql';
import { RubricaUsuario } from '@graphql';
import { CourseviewService } from './profesorcourseview.service';
import { UtilsfunctionsService } from './utilsfunctions.service';
import { CalificaalumnoGQL } from '@graphql';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class ProfesorcalificateService {
  Alumnos: Alumno[] = [];
  Calificaciones = [];
  Secciones = [
    {
      id: '',
      codigo: '',
    },
  ];

  rubrica: BehaviorSubject<Rubrica> = new BehaviorSubject(null);

  // rubrica: Rubrica = null;

  // Rubricausuario = [
  //   {
  //     id: '',
  //     evaluacionTotal: 0,
  //     idalumno: '',
  //     nombre: '',
  //   },
  // ];

  rubricaUsuarios: RubricaUsuario[] = [];

  constructor(
    private utilfunctions: UtilsfunctionsService,
    private getalumnos: RubricausuariobyrubricaseccionGQL,
    private getsecciones: CourseviewService,
    public user: UserService,
    private calificar: CalificaalumnoGQL
  ) {
    console.log(getsecciones.curso?.secciones);
    getsecciones.curso?.secciones?.forEach((i) => {
      var seccion = {
        id: i.id,
        codigo: i.codigo,
      };
      this.Secciones.push(seccion);
    });
    // this.rubrica.subscribe((rubrica: Rubrica) => {
    //   if (rubrica == null) {
    //     return;
    //   }
    //   for (let i = 0; i < rubrica.dimensiones.length; i++) {
    //     rubrica.dimensiones[i].calificaciones.sort((first, second): number => {
    //       if (first.nota > second.nota) {
    //         return -1;
    //       }
    //       if (first.nota < second.nota) {
    //         return 1;
    //       }
    //       return 0;
    //     });
    //   }
    // });
  }

  async updaterubrica(id: string) {
    var dimensionesid: string[] = [];
    dimensionesid = [];
    this.rubrica.next(await this.utilfunctions.updaterubrica(id));
    await this.getrubricasusuario();
  }

  async getrubricasusuario() {
    for (let i of this.Secciones) {
      let data = await this.getalumnos
        .fetch({ ID: this.rubrica.value.id, SECCIONID: i.id })
        .toPromise();

      data.data.rubrica_usuario_by_rubrica_seccion?.forEach((ru) => {
        this.rubricaUsuarios.push(ru);
      });
    }
  }

  calificate({
    nota,
    title,
    calificacionid,
    rubricauserid,
  }: {
    nota: number;
    title: string;
    calificacionid: string;
    rubricauserid: string;
  }) {
    this.calificar
      .mutate({
        NOTA: nota,
        DESC: title,
        CALIFICID: calificacionid,
        RUBUSERID: rubricauserid,
      })
      .subscribe((data) => {
        /*Ni idea que hacer aca pero se deberia hacer algo uwu*/
      });
  }
}
