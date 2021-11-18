import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rubrica',
  templateUrl: './rubrica.component.html',
  styleUrls: ['./rubrica.component.scss']
})
export class RubricaComponent implements OnInit {
  Profesor = "Alexender Schidmt"
  constructor() { }

  ngOnInit(): void {
  }

}
