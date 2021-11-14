import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CallbackComponent } from './pages/auth/callback/callback.component';
import { CreateRubricaComponent } from './pages/create-rubrica/create-rubrica.component';
import { CreateRubricaCreationComponent } from './pages/create-rubrica/create-rubrica-creation/create-rubrica-creation.component';
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
    path: 'callback',
    component: CallbackComponent,
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
  {
    path: 'create-rubrica',
    component: CreateRubricaComponent,
    children:[
      {
        path: 'create-rubrica-creation',
        component: CreateRubricaCreationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
