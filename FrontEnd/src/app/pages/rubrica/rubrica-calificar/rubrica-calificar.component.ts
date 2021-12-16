import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Calificacion, RubricaUsuario } from '@graphql';
import { ProfesorcalificateService } from '@shared/services/profesorcalificate.service';

@Component({
  selector: 'app-rubrica-calificar',
  templateUrl: './rubrica-calificar.component.html',
  styleUrls: ['./rubrica-calificar.component.scss'],
})
export class RubricaCalificarComponent implements OnInit {
  rowsActividad: number = 2;
  toggle = false;
  rubricaUsuario: RubricaUsuario;
  selectedBtn: string;
  califsDimensiones = [];

  constructor(
    private router: ActivatedRoute,
    public calificarservice: ProfesorcalificateService
  ) {
    this.calificarservice.updaterubrica(
      this.router.snapshot.paramMap.get('id')
    );
    this.calificarservice.rubrica.subscribe((rubrica) => {
      if (rubrica != null) {
        var str = new String(
          rubrica.numCritDesemp + rubrica.criterioDeDesempenho
        );
        this.rowsActividad = Math.round(str.length / 130);
        this.califsDimensiones = rubrica.dimensiones.map(() => '');
      }
    });
  }

  ngOnInit(): void {}

  enableDisableRule() {
    this.toggle = !this.toggle;
  }

  // getrowscompetencia() {
  //   var str = new String(
  //     this.calificarservice.rubrica.value.numCritDesemp +
  //       this.calificarservice.rubrica.value.criterioDeDesempenho
  //   );
  //   return Math.round(str.length / 130);
  // }

  setRubricaUsuario(ru: RubricaUsuario) {
    this.rubricaUsuario = ru;
  }

  setPuntaje(calificacion: Calificacion, k: number) {
    this.califsDimensiones[k] = calificacion.id;
    this.calificarservice.calificate({
      nota: calificacion.nota,
      title: '',
      calificacionid: calificacion.id,
      rubricauserid: this.rubricaUsuario.id,
    });
  }

  setSelectedBtn(k: number, c: number) {
    this.selectedBtn = k + '' + c;
  }
}
