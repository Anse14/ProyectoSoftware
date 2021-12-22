import { Component, OnInit } from '@angular/core';
import { VerifyGQL } from '@graphql';
import { User } from '@shared/interfaces/user';
import { CursosService } from '@shared/services/cursos.service';
import { RubricaService } from '@shared/services/rubrica.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-calidad-verificacion',
  templateUrl: './calidad-verificacion.component.html',
  styleUrls: ['./calidad-verificacion.component.scss'],
})
export class CalidadVerificacionComponent implements OnInit {
  ready = false;
  rubricaReady = false;
  rubricaIndex = 0;

  constructor(
    public cursosService: CursosService,
    private rubricaService: RubricaService,
    private user: UserService,
    private verify: VerifyGQL
  ) {}

  async ngOnInit() {
    await this.cursosService.getAllCursos();
    this.cursosService.filterCursosByRubrica();
    this.ready = true;
  }

  async setRubrica(index, id) {
    this.rubricaIndex = index;
    if (id != this.rubricaService.rubrica.value?.id) {
      await this.rubricaService.updateRubrica(id);
    }
    if (
      this.cursosService.curso.value?.nombre !=
      this.rubricaService.rubrica.value?.curso?.nombre
    ) {
      await this.cursosService.getCurso(
        this.rubricaService.rubrica.value.curso.id
      );
    }
    this.rubricaReady = true;
  }

  async aceptarRubrica() {
    let data = await this.verify
      .mutate({
        ID: this.rubricaService.rubrica.value.id,
        CALIDAD: this.user.user.id,
        BOOL: true,
      })
      .toPromise();
    this.rubricaService.rubrica.value.status = true;
    this.cursosService.filterCursosByRubrica();
  }

  async denegarRubrica() {
    let data = await this.verify
      .mutate({
        ID: this.rubricaService.rubrica.value.id,
        CALIDAD: this.user.user.id,
        BOOL: false,
      })
      .toPromise();
    this.rubricaService.rubrica.value.status = null;
    this.cursosService.filterCursosByRubrica();
  }
}
