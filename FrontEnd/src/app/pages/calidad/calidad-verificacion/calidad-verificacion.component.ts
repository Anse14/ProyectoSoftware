import { Component, OnInit } from '@angular/core';
import { CalidadverificacionService } from '@shared/services/calidadverificacion.service';

@Component({
  selector: 'app-calidad-verificacion',
  templateUrl: './calidad-verificacion.component.html',
  styleUrls: ['./calidad-verificacion.component.scss']
})
export class CalidadVerificacionComponent implements OnInit {
  Alumno = "lista de alumnos";


  constructor(
    public verificaservice: CalidadverificacionService) {
      
    }

  ngOnInit(): void {}
}
