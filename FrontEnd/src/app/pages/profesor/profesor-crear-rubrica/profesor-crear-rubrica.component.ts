import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Calificacion, Rubrica } from '@graphql';
import { CursosService } from '@shared/services/cursos.service';
import { NotificationService } from '@shared/services/notification.service';
import { RubricaService } from '@shared/services/rubrica.service';
import { UserService } from '@shared/services/user.service';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-profesor-crear-rubrica',
  templateUrl: './profesor-crear-rubrica.component.html',
  styleUrls: ['./profesor-crear-rubrica.component.scss'],
})
export class ProfesorCrearRubricaComponent
  extends OnDestroyMixin
  implements OnInit
{
  newDimension = {
    id: '',
    description: '',
    excellent: '',
    good: '',
    inProcess: '',
    notAceptable: '',
  };

  rowsActividad = 0;
  rowsCompetencia = 0;

  constructor(
    public rubricaService: RubricaService,
    public cursoService: CursosService,
    public userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
    super();
  }

  ngOnInit(): void {
    this.rubricaService.updateRubrica(this.route.snapshot.paramMap.get('id'));

    this.rubricaService.rubrica
      .pipe(untilComponentDestroyed(this))
      .subscribe((rubrica: Rubrica) => {
        if (rubrica == null) {
          return;
        }

        if (this.cursoService.curso.value == null) {
          this.cursoService.getCurso(rubrica.curso.id);
        }

        var str = new String(rubrica.actividadBase);
        this.rowsActividad = Math.round(str.length / 80);

        var str = new String(
          rubrica.numCritDesemp + rubrica.criterioDeDesempenho
        );
        this.rowsCompetencia = Math.round(str.length / 130);
      });
  }

  async changeCalificacion(newdescription: string, titulo:string) {
    this.rubricaService.updateDimension(0, newdescription, titulo, true, this.newDimension.id);
  }

  async update(pos: number, id: string){
    this.newDimension.id = id;
    const data = this.rubricaService.rubrica.value.dimensiones[pos];
    this.newDimension.description = data.descripcion;
    this.newDimension.excellent = data.calificaciones[0].descripcion;
    this.newDimension.good = data.calificaciones[1].descripcion;
    this.newDimension.inProcess = data.calificaciones[2].descripcion;
    this.newDimension.notAceptable = data.calificaciones[3].descripcion;
  }


  async saveDimension() {
    var dimensioninput: any = {
      descripcion: '',
      calficaciones: Array<Calificacion>(3),
    };
    if (!this.dimensionComplete()) {
      this.notificationService.error('Complete todos los campos');
      return;
    }
    dimensioninput.descripcion = this.newDimension.description;
    dimensioninput.calficaciones[0] = {
      descripcion: this.newDimension.excellent,
      titulo: 'Excelente',
      nota: 0,
    };
    dimensioninput.calficaciones[1] = {
      descripcion: this.newDimension.good,
      titulo: 'Bueno',
      nota: 0,
    };
    dimensioninput.calficaciones[2] = {
      descripcion: this.newDimension.inProcess,
      titulo: 'En desarrollo',
      nota: 0,
    };
    dimensioninput.calficaciones[3] = {
      descripcion: this.newDimension.notAceptable,
      titulo: 'No aceptable',
      nota: 0,
    };

    this.rubricaService.rubrica.next(
      await this.rubricaService.insertDimension(
        this.rubricaService.rubrica.value.id,
        dimensioninput,
        this.rubricaService.rubrica.value
      )
    );

    this.emptynewDImension();
  }

  emptynewDImension(){
    this.newDimension = {
      id: '',
      description: '',
      excellent: '',
      good: '',
      inProcess: '',
      notAceptable: '',
    };
  }

  submitPuntaje(nota, titulo, id) {
    if (isNaN(Number(nota))) {
      this.notificationService.error('Solo coloque numeros');
      return;
    }

    this.rubricaService.updateDimension(nota, '', titulo, false, id);
  }

  async verificate() {
    let rubrica = await this.rubricaService.updateRubrica(
      this.rubricaService.rubrica.value.id
    );
    if (this.verificatePuntajes()) {
      this.rubricaService.saveRubrica(
        this.rubricaService.rubrica.value.id,
        this.userService.user.id
      );
    }
  }

  dimensionComplete(): boolean {
    return (
      this.newDimension.description != '' &&
      this.newDimension.excellent != '' &&
      this.newDimension.good != '' &&
      this.newDimension.inProcess != '' &&
      this.newDimension.notAceptable != ''
    );
  }

  verificatePuntajes(): boolean {
    let maxPuntaje: number = 0;
    if (!this.verificateallcamps()) {
      return false;
    }
    for (let dim of this.rubricaService.rubrica.value.dimensiones) {
      maxPuntaje = dim.calificaciones[0].nota + maxPuntaje;
      for (let i = 0; i < dim.calificaciones.length - 1; i++) {
        if (dim.calificaciones[i].nota > dim.calificaciones[i + 1].nota) {
          this.notificationService.success('Se guardo la rubrica correctamente');
        } else {
          this.notificationService.error('Insertar otros puntajes');
          return false;
        }
      }
    }
    if (maxPuntaje == 20) {
      return true;
    } else {
      this.notificationService.error(
        'La suma de los puntajes en excelente debe ser 20'
      );
      return false;
    }
  }

  verificateallcamps(): boolean {
    if (this.rubricaService.rubrica.value.dimensiones.length >= 4) {
      return true;
    }
    this.notificationService.error('Por favor ingrese al menos 4 dimensiones');
    return false;
  }

}
