import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-calidad',
  templateUrl: './calidad.component.html',
  styleUrls: ['./calidad.component.scss']
})
export class CalidadComponent implements OnInit {

  Calidad = "Alexender Schidmt"

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

}
