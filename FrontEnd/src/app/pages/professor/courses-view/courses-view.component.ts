
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseviewService } from '@shared/services/profesorcourseview.service';

@Component({
  selector: 'app-courses-view',
  templateUrl: './courses-view.component.html',
  styleUrls: ['./courses-view.component.scss'],
})
export class CoursesViewComponent implements OnInit {
  
  constructor(private route: ActivatedRoute, private router: Router, 
    public rubricaservice: CourseviewService) {
    this.rubricaservice.getRubricasCurso(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
  }

  goToRubricaCreation(id: String) {
    this.router.navigate(['/professor/create-rubrica', id]);
  }

  goToRubricaCalificar(id: String) {
    this.router.navigate(['/professor/calificate-rubrica', id]);
  }
}
