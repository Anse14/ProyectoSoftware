import { Component, OnInit } from '@angular/core';
import { Profesor } from '@shared/interfaces/profesor';
import { ShowcursosprofesorService } from '@shared/services/showcursosprofesor.service';
import { CursosprofesorService } from '@shared/services/cursosprofesor.service';

import { Curso } from '@shared/interfaces/curso';
import { CURSOS } from '@shared/mocksdata/mockCursoData';


@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.scss'],
})
export class ProfessorDashboardComponent implements OnInit {
  profesor: Profesor;
  cursos: Curso[] = Array<Curso>();

  constructor(private profesorservice: ShowcursosprofesorService) {}
  ngOnInit(): void {
    this.getProfesor();
  }
  getProfesor(){
    this.profesorservice.getProfesorCursos()
      .subscribe(cursos => 
        {
          console.log(cursos);
          this.cursos = cursos});
  }
}