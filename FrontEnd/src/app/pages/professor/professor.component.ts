import { Component, OnInit } from '@angular/core';
import { User } from '@shared/interfaces/user';
import { AuthService } from '@shared/services/auth.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.scss']
})
export class ProfessorComponent implements OnInit {


  constructor(private authService: AuthService, public user: UserService) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }
}


