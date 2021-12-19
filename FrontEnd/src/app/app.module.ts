import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from '@auth0/angular-jwt';
import { NbSidebarModule, NbThemeModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChartModule } from 'angular2-chartjs';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

import { GraphQLModule } from './shared/modules/graphql.module';
import { NebularModule } from './shared/modules/nebular.module';

import { PrincipalComponent } from './pages/principal/principal.component';
import { LoadingComponent } from './components/loading/loading.component';
import { ProfesorComponent } from './pages/profesor/profesor.component';
import { ProfesorDashboardComponent } from './pages/profesor/profesor-dashboard/profesor-dashboard.component';
import { ProfesorCoursesViewComponent } from './pages/profesor/profesor-courses-view/profesor-courses-view.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LoadingComponent,
    ProfesorComponent,
    ProfesorDashboardComponent,
    ProfesorCoursesViewComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GraphQLModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbToastrModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbEvaIconsModule,
    NebularModule,
    SocialLoginModule,
    ChartModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme: 'Bearer ',
        allowedDomains: [environment.serverPath.replace('http://', '')],
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
