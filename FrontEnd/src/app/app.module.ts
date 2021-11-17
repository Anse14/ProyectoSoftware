import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChartModule } from 'angular2-chartjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { PrincipalComponent } from './pages/principal/principal.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfessorComponent } from './pages/professor/professor.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { ProfessorDashboardComponent } from './pages/professor/professor-dashboard/professor-dashboard.component';
import { RubricaComponent } from './pages/rubrica/rubrica.component';
import { RubricaCreationComponent } from './pages/rubrica/rubrica-creation/rubrica-creation.component';
import { AlumnoComponent } from './pages/alumno/alumno.component';

import { GraphQLModule } from './graphql.module';
import { NebularModule } from './nebular.module';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { CalidadComponent } from './pages/calidad/calidad.component';
import { CalidadDashboardComponent } from './pages/calidad/calidad-dashboard/calidad-dashboard.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    DashboardComponent,
    AlumnoComponent,
    ProfessorComponent,
    CourseCardComponent,
    ProfessorDashboardComponent,
    RubricaComponent,
    RubricaCreationComponent,
    CalidadComponent,
    CalidadDashboardComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GraphQLModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbEvaIconsModule,
    NebularModule,
    SocialLoginModule,
    ChartModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: "Bearer ",
        allowedDomains: [environment.serverPath.replace('http://', '')],
        // disallowedRoutes: [environment.serverPath + "/auth/*"],
      },
    }),
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.cliendId),
          },
        ],
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
