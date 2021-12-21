import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calificacion, Rubrica, RubricaUsuario } from '@graphql';
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

  constructor(
    private route: ActivatedRoute,
    public rubricaService: RubricaService,
    public userService: UserService,
    public alumnosService: AlumnosService,
    public cursoService: CursosService,
    public calificacionService: CalificacionService,
    public notificationService: NotificationService
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
        this.califsDimensiones = rubrica.dimensiones.map(() => '');
        this.califsDimensionesPosic = [...this.califsDimensiones];
      });
  }

  enableDisableRule() {
    this.toggle = !this.toggle;
  }

  setRubricaUsuario(ru: RubricaUsuario) {
    this.rubricaUsuario = ru;
  }

  setPuntaje(calificacion: Calificacion, k: number) {
    if (this.rubricaUsuario == null) {
      this.notificationService.error('Debe de seleccionar un alumno primero');
      return;
    }

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

    this.califsDimensionesPosic[k] = calificacion;
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
    }

    console.log(calificacion);
    this.califsDimensiones[k] = calificacion.id;
    this.calificacionService.calificate(
      calificacion.nota,
      '',
      calificacion.id,
      this.rubricaUsuario.id
    );
  }

  setSelectedBtn(k: number, c: number) {
    this.selectedBtn = k + '' + c;
  }
}
