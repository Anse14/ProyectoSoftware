import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Calificacion,
  GetDimensionUsuarioByRubricaUsuarioGQL,
  Rubrica,
  RubricaUsuario,
} from '@graphql';
import { AlumnosService } from '@shared/services/alumnos.service';
import { CalificacionService } from '@shared/services/calificacion.service';
import { CursosService } from '@shared/services/cursos.service';
import { NotificationService } from '@shared/services/notification.service';
import { RubricaService } from '@shared/services/rubrica.service';
import { UserService } from '@shared/services/user.service';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-profesor-calificar-rubrica',
  templateUrl: './profesor-calificar-rubrica.component.html',
  styleUrls: ['./profesor-calificar-rubrica.component.scss'],
})
export class ProfesorCalificarRubricaComponent
  extends OnDestroyMixin
  implements OnInit
{
  rowsActividad: number = 2;
  rubricaUsuario: RubricaUsuario = null;
  toggle = false;
  selectedBtn: string;
  califsDimensiones = [];
  califsDimensionesPosic = [];

  resultados = {
    exelente: 0,
    bueno: 0,
    enDesarrollo: 0,
    noAceptable: 0,
  };

  calificacionesArray = ['excelente', 'bueno', 'en desarrollo', 'no aceptable'];

  constructor(
    private route: ActivatedRoute,
    public rubricaService: RubricaService,
    public userService: UserService,
    public alumnosService: AlumnosService,
    public cursoService: CursosService,
    public calificacionService: CalificacionService,
    public notificationService: NotificationService,
    private getDimensionUsuarioByRubricaUsuario: GetDimensionUsuarioByRubricaUsuarioGQL
  ) {
    super();
  }

  ngOnInit(): void {
    this.rubricaService.updateRubrica(this.route.snapshot.paramMap.get('id'));

    this.rubricaService.rubrica
      .pipe(untilComponentDestroyed(this))
      .subscribe(async (rubrica: Rubrica) => {
        if (rubrica == null) {
          return;
        }

        if (this.cursoService.curso.value == null) {
          await this.cursoService.getCurso(rubrica.curso.id);
          await this.alumnosService.getAlumnos();
        }

        var str = new String(
          rubrica.numCritDesemp + rubrica.criterioDeDesempenho
        );
        this.rowsActividad = Math.round(str.length / 130);
        console.log(rubrica.dimensiones);
        console.log(rubrica.dimensiones.length);

        this.califsDimensiones = rubrica.dimensiones.map(() => '');
        this.califsDimensionesPosic = [...this.califsDimensiones];
      });
  }

  getResultado(pos: number): number {
    return this.califsDimensionesPosic.filter(
      (iter) => iter.toLowerCase() == this.calificacionesArray[pos]
    ).length;
  }
  enableDisableRule() {
    this.toggle = !this.toggle;
  }

  async setRubricaUsuario(ru: RubricaUsuario) {
    const data = await this.cursoService.getDimensionesUser(ru.id);
    if (data == null) {
      this.califsDimensionesPosic =
        this.rubricaService.rubrica.value.dimensiones.map(() => '');
      if (
        this.rubricaUsuario &&
        this.califsDimensionesPosic.some((iter) => typeof iter != 'object')
      ) {
        this.notificationService.error(
          'Debe de terminar de calificar al alumno primero'
        );
        return;
      }
      this.rubricaUsuario = ru;
    } else {
      const dimusers = data.data.dimension_usuario_by_rubrica_usuario;
      var i = 0;
      for (let dim of this.rubricaService.rubrica.value.dimensiones) {
        for (let dimuser of dimusers) {
          if (dimuser.dimension.id == dim.id) {
            this.califsDimensionesPosic[i] = dimuser.descripcion;
            this.califsDimensiones[i] = dimuser.calificacion.id;
            i++;
          }
        }
      }
      this.rubricaUsuario = ru;
    }
  }

  getDisableSelect() {
    return (
      this.rubricaUsuario &&
      this.califsDimensionesPosic.some((iter) => typeof iter != 'object')
    );
  }
  getMessage() {
    if (this.getDisableSelect()) {
      this.notificationService.error(
        'Debe de terminar de calificar al alumno primero'
      );
    }
  }

  getPorcentaje(pos: number): number {
    const excelente = this.getResultado(0);
    const bueno = this.getResultado(1);
    const enDesarrollo = this.getResultado(2);
    const noAceptable = this.getResultado(3);
    if (pos == 0) {
      return (
        ((excelente + bueno) * 100) /
        this.rubricaService.rubrica.value?.dimensiones.length
      );
    } else {
      return (
        ((enDesarrollo + noAceptable) * 100) /
        this.rubricaService.rubrica.value?.dimensiones.length
      );
    }
  }

  setPuntaje(calificacion: Calificacion, k: number, title: string) {
    if (this.rubricaUsuario == null) {
      this.notificationService.error('Debe de seleccionar un alumno primero');
      return;
    }
    /*
    if (this.califsDimensiones[k] == calificacion.id) {
      return;
    }

    if (this.califsDimensionesPosic[k] != '') {
      switch (this.califsDimensionesPosic[k].titulo) {
        case 'Excelente':
          this.resultados.exelente -= 1;
          break;
        case 'Bueno':
          this.resultados.bueno -= 1;
          break;
        case 'En desarrollo':
          this.resultados.enDesarrollo -= 1;
          break;
        case 'No aceptable':
          this.resultados.noAceptable -= 1;
          break;
      }
    }

    switch (calificacion.titulo) {
      case 'Excelente':
        this.resultados.exelente += 1;
        break;
      case 'Bueno':
        this.resultados.bueno += 1;
        break;
      case 'En desarrollo':
        this.resultados.enDesarrollo += 1;
        break;
      case 'No aceptable':
        this.resultados.noAceptable += 1;
        break;
    }*/
    this.califsDimensionesPosic[k] = calificacion.titulo;

    console.log(calificacion);
    this.califsDimensiones[k] = calificacion.id;
    this.calificacionService.calificate(
      calificacion.nota,
      title,
      calificacion.id,
      this.rubricaUsuario.id
    );
  }

  setSelectedBtn(k: number, c: number) {
    this.selectedBtn = k + '' + c;
  }
}
