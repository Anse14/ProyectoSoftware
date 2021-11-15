import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss']
})
export class AlumnoComponent implements OnInit {
  Alumno = "Alexender Schidmt"
  constructor() { }

  ngOnInit(): void {
  }

}
