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
  colors = [
    '#FF3F3F',
    '#FFEB3F',
    '#FF993F',
    '#46FF3F',
    '#3FE8FF',
    '#3FAFFF',
    '#853FFF',
  ];

  constructor(
    private userService: UserService,
    private profesorService: ProfesorService,
    public cursosService: CursosService,
    private router: Router
  ) {
    super();
    this.shuffleArray(this.colors);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
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
    return this.colors[i % this.colors.length];
  }

  goToCourseView(id: string) {
    this.router.navigate(['/profesor/course-view', id]);
  }
}
