import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NbThemeModule, NbToastrModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ChartModule } from 'angular2-chartjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { PrincipalComponent } from './pages/principal/principal.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { GraphQLModule } from './shared/modules/graphql.module';
import { NebularModule } from './shared/modules/nebular.module';
import { GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LoadingComponent } from './components/loading/loading.component';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    DashboardComponent,
    LoadingComponent
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
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatButtonModule,
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
