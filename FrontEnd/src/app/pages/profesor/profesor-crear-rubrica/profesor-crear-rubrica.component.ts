import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rubrica } from '@graphql';
import { CursosService } from '@shared/services/cursos.service';
import { RubricaService } from '@shared/services/rubrica.service';
import { UserService } from '@shared/services/user.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-profesor-crear-rubrica',
  templateUrl: './profesor-crear-rubrica.component.html',
  styleUrls: ['./profesor-crear-rubrica.component.scss'],
})
export class ProfesorCrearRubricaComponent implements OnInit {
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
    this.rubricaService.updateRubrica(this.route.snapshot.paramMap.get('id'));

    this.rubricaService.rubrica.subscribe((rubrica: Rubrica) => {
      if (rubrica == null) {
        return;
      }

      var str = new String(rubrica.actividadBase);
      this.rowsActividad = Math.round(str.length / 80);

      var str = new String(
        rubrica.numCritDesemp + rubrica.criterioDeDesempenho
      );
      this.rowsCompetencia = Math.round(str.length / 130);
    });
  }

  ngOnInit(): void {}

  saveDimension() {}

  verificate() {}

  // submitPuntaje(
  //   newnota.value,
  //   cal.titulo,
  //   dim.id
  // )

  submitPuntaje(nota, titulo, id) {}
}
