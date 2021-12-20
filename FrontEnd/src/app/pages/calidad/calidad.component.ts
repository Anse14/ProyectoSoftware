import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-calidad',
  templateUrl: './calidad.component.html',
  styleUrls: ['./calidad.component.scss'],
})
export class CalidadComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public userService: UserService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }
}