import { Injectable } from '@angular/core';
import { Calificacion, Dimension, DimensionInput } from '@graphql';
/*import { Rubrica } from '@graphql';*/
import { UpdaterubricaGQL } from '@graphql';
import { CourseviewService } from './profesorcourseview.service';
import { UserService } from './user.service';
import { Rubrica } from '@shared/interfaces/rubrica';
import { UtilsfunctionsService } from './utilsfunctions.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfesorcreateService {
  profesor: string;
  rubrica: BehaviorSubject<Rubrica> = new BehaviorSubject({});

  existdimensions = false;

  newdim: string;
  newexc: string;
  newexcnota: number;
  newbueno: string;
  newendes: string;
  newnoacept: string;

  curso: string = '';

  constructor(
    private route: Router,
    private utilfunctions: UtilsfunctionsService,
    public cursoservice: CourseviewService,
    public user: UserService,
    private saverubrica: UpdaterubricaGQL
  ) {
    this.curso = cursoservice.curso?.nombre;
  }

  async savedimension() {
    var dimensioninput: any = {
      descripcion: '',
      calficaciones: Array<Calificacion>(3),
    };
    if (
      this.newdim &&
      this.newexc &&
      this.newbueno &&
      this.newendes &&
      this.newnoacept
    ) {
      dimensioninput.descripcion = this.newdim;
      dimensioninput.calficaciones[0] = {
        descripcion: this.newexc,
        titulo: 'Excelente',
        nota: 0,
      };
      dimensioninput.calficaciones[1] = {
        descripcion: this.newbueno,
        titulo: 'Bueno',
        nota: 0,
      };
      dimensioninput.calficaciones[2] = {
        descripcion: this.newendes,
        titulo: 'En desarrollo',
        nota: 0,
      };
      dimensioninput.calficaciones[3] = {
        descripcion: this.newnoacept,
        titulo: 'No aceptable',
        nota: 0,
      };
      //INSERT DIMENSION
      this.rubrica.next(
        this.utilfunctions.InsertDimension({
          rubricaid: this.rubrica.value.id,
          dimensioninput: dimensioninput,
          rubrica: this.rubrica.value,
        })
      );
      this.newdim = '';
      this.newexc = '';
      this.newbueno = '';
      this.newendes = '';
      this.newnoacept = '';
    } else {
      alert('Complete todos los campos');
    }
  }

  submitpuntaje(puntaje: string, title: string, dimensionid: string) {
    if (isNaN(Number(puntaje))) {
      alert('Solo coloquee numeros');
    } else {
      this.utilfunctions.UpdateDimension({
        puntaje,
        descripcion: '',
        title,
        bool: false,
        dimensionid,
      });
    }
  }
  verificate() {
    this.utilfunctions.updaterubrica(this.rubrica.value.id).then((rubrica) => {
      this.rubrica.next(rubrica);
      if (this.verificatepuntajes()) {
        this.saverubrica
          .mutate({ ID: this.rubrica.value.id, ProfesorId: this.user.user.id })
          .subscribe((data) => {
            if (data.data.update_rubrica_by_pk.valueOf() == true) {
              location.reload();
              //alert("Se guardo correctamente la rubrica");
              //this.route.navigate(['/professor/course-view', this.cursoservice.curso.id]);
            }
          });
      }
    });
    //SAVE RUBRICA

    //this.route.navigate(['/professor/course-view', this.cursoservice.curso.id]);
    //REDIRECCIONAR A PROFESOR DASHBOARD
  }

  //SAVE BUTTONS
  verificatepuntajes(): boolean {
    let maxPuntaje: number = 0;
    if (this.verificateallcamps()) {
      for (let dim of this.rubrica.value.dimensiones) {
        maxPuntaje = dim.calificaciones[0].nota + maxPuntaje;
        console.log(this.rubrica.value.dimensiones);
        for (let i = 0; i < dim.calificaciones.length - 1; i++) {
          if (dim.calificaciones[i].nota > dim.calificaciones[i + 1].nota) {
          } else {
            alert('Insertar otros puntajes');
            return false;
          }
        }
      }
      if (maxPuntaje == 20) {
        return true;
      } else {
        alert('La suma de los puntajes en excelente debe ser 20');
        return false;
      }
    }
    return false;
  }

  verificateallcamps(): boolean {
    if (this.rubrica.value.dimensiones.length >= 4) {
      return true;
    }
    alert('Please enter at least 4 dimensions');
    return false;
  }

  updaterubrica(id: string) {
    this.utilfunctions.updaterubrica(id).then((rubrica) => {
      this.rubrica.next(rubrica);
      if (this.rubrica.value.dimensiones.length >= 0)
        this.existdimensions = true;
    });
  }
}
