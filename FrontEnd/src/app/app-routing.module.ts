import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { RubricaComponent } from './pages/rubrica/rubrica.component';
import { RubricaCreationComponent } from './pages/rubrica/rubrica-creation/rubrica-creation.component';
import { CoursesViewComponent } from './pages/professor/courses-view/courses-view.component';
import { ProfessorDashboardComponent } from './pages/professor/professor-dashboard/professor-dashboard.component';
import { ProfessorComponent } from './pages/professor/professor.component';
import { AlumnoComponent } from './pages/alumno/alumno.component';
import { CalidadComponent } from './pages/calidad/calidad.component';
import { CalidadDashboardComponent } from './pages/calidad/calidad-dashboard/calidad-dashboard.component';
import { AuthGuard } from '@shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'alumno',
    component: AlumnoComponent, 
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
  {
    path: 'rubrica',
    component: RubricaComponent,
    children:[
      {
        path: 'create-rubrica',
        component: RubricaCreationComponent,
      },
    ],
  },
  {
    path: 'calidad',
    component: CalidadComponent,
    children:[
      {
        path: 'dashboard',
        component: CalidadDashboardComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
