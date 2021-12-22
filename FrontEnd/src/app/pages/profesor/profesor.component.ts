import { Component, OnInit } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss'],
})
export class ProfesorComponent implements OnInit {
  constructor(
    public userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  logout() {}
}
