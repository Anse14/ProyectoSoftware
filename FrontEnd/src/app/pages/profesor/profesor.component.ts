import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  logout() {
    this.authService.logout();
  }

  returnToDashboard() {
    this.router.navigateByUrl('profesor/dashboard')
  }
}
