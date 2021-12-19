import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rubrica } from '@graphql';
import { CursosService } from '@shared/services/cursos.service';
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
    private route: ActivatedRoute
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

        if(this.cursoService.curso.value == null) {
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

  saveDimension() {}

  verificate() {}

  submitPuntaje(nota, titulo, id) {}
}
