import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.scss'],
})
export class CoursesViewComponent implements OnInit {
  codCurso: string;

  constructor(private router: Router) {
    this.codCurso = this.router.getCurrentNavigation().extras.state.codCurso;
  }

  ngOnInit(): void {}
}
