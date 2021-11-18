import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() color: string;
  @Input() codCurso: string;
  @Input() nombreCurso: string;
  @Input() horario: string[];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToCourseView() {
    this.router.navigateByUrl('/professor/course-view', {
      state: {
        codCurso: this.codCurso,
        nombreCurso: this.nombreCurso,
      },
    });
  }
}
