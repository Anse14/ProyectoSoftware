import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@shared/services/auth.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.authService.login();
  }

  ngOnDestroy(): void {
  }
}
