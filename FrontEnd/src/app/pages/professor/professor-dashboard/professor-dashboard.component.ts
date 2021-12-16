import { Component, OnInit } from '@angular/core';
import { Profesor } from '@shared/interfaces/profesor';
import { NotificationService } from '@shared/services/notification.service';
import { ProfesordashboardService } from '@shared/services/profesordashboard.service';
import { UserService } from '@shared/services/user.service';

@Component({
  selector: 'app-professor-dashboard',
  templateUrl: './professor-dashboard.component.html',
  styleUrls: ['./professor-dashboard.component.scss'],
})
export class ProfessorDashboardComponent implements OnInit {
  profesor: Profesor = { id: null };
  // cursos: Curso[] = Array<Curso>();

  constructor(
    public profesorservice: ProfesordashboardService,
    private user: UserService
  ) {
    this.user.userEmmiter.subscribe((usr) => {
      if (usr == null) {
        return;
      }
      this.profesorservice.getProfesorCursos();
    });
  }

  ngOnInit(): void {
  }
}
