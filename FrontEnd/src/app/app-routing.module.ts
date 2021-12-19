import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@shared/guards/auth.guard';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ProfesorCoursesViewComponent } from './pages/profesor/profesor-courses-view/profesor-courses-view.component';
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
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        component: ProfesorDashboardComponent
      },
      {
        path: 'course-view/:id',
        component: ProfesorCoursesViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
