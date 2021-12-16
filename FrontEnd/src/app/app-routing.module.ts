import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PrincipalComponent } from './pages/principal/principal.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
