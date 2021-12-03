import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Curso } from '@shared/interfaces/cursoborrable';
import { Showcursoscalidad } from '@shared/services/showcursoscalidad.service';
import { ShowrubricaService } from '@shared/services/showrubrica.service';
import { Rubrica } from '@shared/interfaces/rubricaborrable';

@Component({
  selector: 'app-calidad-verificacion',
  templateUrl: './calidad-verificacion.component.html',
  styleUrls: ['./calidad-verificacion.component.scss']
})
export class CalidadVerificacionComponent implements OnInit {
  cursos: Curso[] = [];
  curso: Curso;
  rubrica: Rubrica;
  Alumno = "lista de alumnos";


  constructor(private cursoservice: Showcursoscalidad, private rubricaservie: ShowrubricaService) { }

  ngOnInit(): void {
    this.getCursos();
    this.filtCursos();
    this.getCurso(this.cursos[0].id);
    this.getCursoRubrica(this.curso.id, this.curso.rubricas[0].codigo);
  }

  getRubrica(codigo: string, rubricas: Rubrica[]): void {
    this.rubricaservie.getRubrica(codigo, rubricas)
      .subscribe(rubrica => this.rubrica = rubrica);
  }

  getCurso(id: number): void {
    this.cursoservice.getCurso(id)
      .subscribe(curso => this.curso = curso);
  }
  getCursoRubrica(id: number, codigo: string): void {
    this.cursoservice.getCurso(id)
      .subscribe(curso => this.curso = curso);
    this.getRubrica(codigo, this.curso.rubricas);
  }

  getCursos(): void {
    this.cursoservice.getCursos()
      .subscribe(cursos => this.cursos = cursos);
  }

  filtCursos(): void {
    var newcursos: Curso[] = Array<Curso>();
    for (let curso of this.cursos) {
      for (let rubrica of curso.rubricas) {
        if (rubrica.status == false) {
          newcursos.push(curso);
          break;
        }
      }
    }
    this.cursos = newcursos;
  }

  acceptRubric():void{
    this.rubrica.status= true;
    this.filtCursos();
  }

  deniedRubric():void{
    this.rubrica.status= null;
    this.filtCursos();
  }

}
