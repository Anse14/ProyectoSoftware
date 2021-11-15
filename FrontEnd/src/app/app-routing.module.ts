import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { CoursesViewComponent } from './pages/professor/courses-view/courses-view.component';
import { ProfessorDashboardComponent } from './pages/professor/professor-dashboard/professor-dashboard.component';
import { ProfessorComponent } from './pages/professor/professor.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'professor',
    component: ProfessorComponent,
    children: [
      {
        path: 'dashboard',
        component: ProfessorDashboardComponent,
      },
      {
        path: 'course-view',
        component: CoursesViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
