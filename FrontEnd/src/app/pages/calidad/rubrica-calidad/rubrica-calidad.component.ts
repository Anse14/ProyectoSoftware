import { Component, OnInit } from '@angular/core';
import { CalidadverificacionService } from '@shared/services/calidadverificacion.service';
import { CalidadVerificacionComponent } from '../calidad-verificacion/calidad-verificacion.component';

@Component({
  selector: 'app-rubrica-calidad',
  templateUrl: './rubrica-calidad.component.html',
  styleUrls: ['./rubrica-calidad.component.scss']
})
export class RubricaCalidadComponent implements OnInit {

  constructor(public verificaservice: CalidadverificacionService) { }

  ngOnInit(): void {
  }
  getrowsactividad(){
    var str = new String (this.verificaservice.rubrica.actividadBase);
    return Math.round(str.length/80);
  }
  getrowscompetencia(){
    var str = new String(this.verificaservice.rubrica.numCritDesemp + this.verificaservice.rubrica.criterioDeDesempenho);
    return Math.round(str.length/130);
  }
}
