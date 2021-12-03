import { Component, OnInit } from '@angular/core';
import { Dimension } from '../../../shared/interfaces/dimension';

@Component({
  selector: 'app-rubrica-creation',
  templateUrl: './rubrica-creation.component.html',
  styleUrls: ['./rubrica-creation.component.scss']
})
export class RubricaCreationComponent implements OnInit {
  Curso = "curso";
  Ciclo = "ciclo";
  Semestre = "semestre";
  Actividad = "actividad"
  Semana = "semana";
  Fecha = "fecha";
  Competencia = "competencia";
  Alumno = "lista de alumnos";
  Profesor = "profesor";
  Tipoactividad = "proyecto";
  proyecto = true;
  trabajo = false; 
  laboratorio = false;
  otros = false; 
  /* Deberia crear una clase para la informacion de la rubrica tipo dimension.ts? */

  
  dimensiones: Dimension[] = [];
  newdim: string;
  newexc : string;
  newbueno: string;
  newendes: string;
  newnoacept: string;

  savedimension(){
    if (this.newdim && this.newexc && this.newbueno && this.newendes && this.newnoacept){
      var dim= {} as Dimension
      dim.dim = this.newdim;
      dim.excelente = this.newexc;
      dim.bueno = this.newbueno;
      dim.endesarrollo = this.newendes;
      dim.noaceptable = this.newnoacept;
      this.dimensiones.push(dim);
      this.newdim = "";
      this.newexc = "";
      this.newbueno = "";
      this.newendes = "";
      this.newnoacept = "";
    }
    else{
      alert("Please enter complete data");
    }
  }
  constructor() { }

  ngOnInit(): void {
  }

}
