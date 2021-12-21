import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { CalidadDashboardComponent } from './pages/calidad/calidad-dashboard/calidad-dashboard.component';
import { CalidadVerificacionComponent } from './pages/calidad/calidad-verificacion/calidad-verificacion.component';
import { CalidadComponent } from './pages/calidad/calidad.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ProfesorCalificarRubricaComponent } from './pages/profesor/profesor-calificar-rubrica/profesor-calificar-rubrica.component';
import { ProfesorCoursesViewComponent } from './pages/profesor/profesor-courses-view/profesor-courses-view.component';
import { ProfesorCrearRubricaComponent } from './pages/profesor/profesor-crear-rubrica/profesor-crear-rubrica.component';
import { ProfesorDashboardComponent } from './pages/profesor/profesor-dashboard/profesor-dashboard.component';
import { ProfesorComponent } from './pages/profesor/profesor.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: PrincipalComponent,
  },
  {
    path: 'profesor',
    canActivate: [AuthGuard],
    component: ProfesorComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: ProfesorDashboardComponent,
      },
      {
        path: 'course-view/:id',
        component: ProfesorCoursesViewComponent,
      },
      {
        path: 'crear-rubrica/:id',
        component: ProfesorCrearRubricaComponent,
      },
      {
        path: 'calificar-rubrica/:id',
        component: ProfesorCalificarRubricaComponent,
      },
    ],
  },
  {
    path: 'calidad',
    canActivate: [AuthGuard],
    component: CalidadComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: CalidadDashboardComponent,
      },
      {
        path: 'verificacion',
        component: CalidadVerificacionComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
