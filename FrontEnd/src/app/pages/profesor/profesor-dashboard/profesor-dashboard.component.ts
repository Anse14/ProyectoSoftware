import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CursosService } from '@shared/services/cursos.service';
import { ProfesorService } from '@shared/services/profesor.service';
import { UserService } from '@shared/services/user.service';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';

@Component({
  selector: 'app-profesor-dashboard',
  templateUrl: './profesor-dashboard.component.html',
  styleUrls: ['./profesor-dashboard.component.scss'],
})
export class ProfesorDashboardComponent
  extends OnDestroyMixin
  implements OnInit
{
  constructor(
    private userService: UserService,
    private profesorService: ProfesorService,
    public cursosService: CursosService,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService.userEmmiter
      .pipe(untilComponentDestroyed(this))
      .subscribe((data) => {
        if (data == null) {
          return;
        }
        this.profesorService.getProfesor();
      });
  }

  getColor(i: number): string {
    const colors = [
      '#FF3F3F',
      '#FFEB3F',
      '#FF993F',
      '#46FF3F',
      '#3FE8FF',
      '#3FAFFF',
      '#853FFF',
    ];
    return colors[i % colors.length];
  }

  goToCourseView(id: string) {
    this.router.navigate(['/profesor/course-view', id]);
  }
}
