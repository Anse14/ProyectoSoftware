import { Component, OnInit } from '@angular/core';
import { Dimension } from './dimension';

@Component({
  selector: 'app-create-rubrica-creation',
  templateUrl: './create-rubrica-creation.component.html',
  styleUrls: ['./create-rubrica-creation.component.scss']
})


export class CreateRubricaCreationComponent implements OnInit {

  dimensiones: Dimension[] = [];
  newdim: string;
  newexc : string;
  newbueno: string;
  newendes: string;
  newnoacept: string;

  savedimension(){
      let dim = new Dimension();
      dim.cd="1.1"
      dim.dim = this.newdim;
      dim.excelente = this.newexc;
      dim.bueno = this.newbueno;
      dim.endesarrollo = this.newendes;
      dim.noaceptable = this.newnoacept;
      this.dimensiones.push(dim);

  }
  constructor() { }

  ngOnInit(): void {
  } 

}
