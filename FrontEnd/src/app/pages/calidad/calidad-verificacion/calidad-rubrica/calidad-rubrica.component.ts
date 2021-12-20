import { Component, OnInit } from '@angular/core';
import { Rubrica } from '@graphql';
import { CursosService } from '@shared/services/cursos.service';
import { RubricaService } from '@shared/services/rubrica.service';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-calidad-rubrica',
  templateUrl: './calidad-rubrica.component.html',
  styleUrls: ['./calidad-rubrica.component.scss'],
})
export class CalidadRubricaComponent extends OnDestroyMixin implements OnInit {
  rowsActividad = 0;
  rowsCompetencia = 0;

  constructor(
    public rubricaService: RubricaService,
    public cursoService: CursosService
  ) {
    super();
  }

  ngOnInit(): void {
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
}
