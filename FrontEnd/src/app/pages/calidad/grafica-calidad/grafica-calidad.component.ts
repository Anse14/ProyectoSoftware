import { Component, OnInit } from '@angular/core';
import { CalidadresultadosService } from '@shared/services/calidadresultados.service';

@Component({
  selector: 'app-grafica-calidad',
  templateUrl: './grafica-calidad.component.html',
  styleUrls: ['./grafica-calidad.component.scss']
})
export class GraficaCalidadComponent implements OnInit {



  constructor(public calidad: CalidadresultadosService) { }

  ngOnInit(): void {
  }

}
