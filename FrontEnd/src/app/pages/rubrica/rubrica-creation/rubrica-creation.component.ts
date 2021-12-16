import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfesorcreateService } from '@shared/services/profesorcreate.service';

@Component({
  selector: 'app-rubrica-creation',
  templateUrl: './rubrica-creation.component.html',
  styleUrls: ['./rubrica-creation.component.scss']
})
export class RubricaCreationComponent implements OnInit {
  /* Deberia crear una clase para la informacion de la rubrica tipo dimension.ts? */

  constructor(private route: ActivatedRoute, 
    public rubricaservice: ProfesorcreateService) {
    this.rubricaservice.updaterubrica(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }
  getrowsactividad(){
    var str = new String (this.rubricaservice.rubrica.value.actividadBase);
    return Math.round(str.length/80);
  }
  getrowscompetencia(){
    var str = new String(this.rubricaservice.rubrica.value.numCritDesemp + this.rubricaservice.rubrica.value.criterioDeDesempenho);
    return Math.round(str.length/130);
  }
  
}