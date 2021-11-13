import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NbCardModule, NbLayoutModule, NbThemeModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbAuthModule,
  NbOAuth2AuthStrategy,
  NbOAuth2ResponseType,
} from '@nebular/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { PrincipalComponent } from './pages/principal/principal.component';
import { CallbackComponent } from './pages/auth/callback/callback.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfessorComponent } from './pages/professor/professor.component';
import { CourseCardComponent } from './components/course-card/course-card.component';
import { ProfessorDashboardComponent } from './pages/professor/professor-dashboard/professor-dashboard.component';
import { GraphQLModule } from './graphql.module';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CallbackComponent,
    DashboardComponent,
    ProfessorComponent,
    CourseCardComponent,
    ProfessorDashboardComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }), 
    NbEvaIconsModule,
    NbLayoutModule,
    NbCardModule,
    NbAuthModule.forRoot({
      strategies: [
        NbOAuth2AuthStrategy.setup({
          name: 'google',
          clientId: environment.cliendId,
          clientSecret: '',
          authorize: {
            endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            redirectUri: 'http://localhost:4200/callback',
          },
          redirect: {
            success: '/dashboard',
            failure: '/',
          },
        }),
      ],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
