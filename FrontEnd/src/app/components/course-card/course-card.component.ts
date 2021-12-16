import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from '@shared/interfaces/curso';

@Component({
  selector: 'course-card',
  templateUrl: './course-card.component.html',
  styleUrls: ['./course-card.component.scss'],
})
export class CourseCardComponent implements OnInit {
  @Input() color: string;
  @Input() curso: Curso;
  @Input() nombreProf: string;

  constructor(
    private router: Router) {}
  
  ngOnInit(): void {}

  goToCourseView(id: string) {
    this.router.navigate(['/professor/course-view', id]);
  }
}
