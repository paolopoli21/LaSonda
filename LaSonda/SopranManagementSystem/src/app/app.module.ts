import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
//import { MainNavComponent } from './shared/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
//Moduli manuali
// import { LoginModule } from './top/login/login.module';
import { LoginModule } from './top/login/login.module';
import { SharedModule } from './shared/shared/shared.module';

//moduli Materila
import { MatToolbarModule } from '@angular/material/toolbar';
//import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
//import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
//import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
//import { MsalModule } from '@azure/msal-angular';
////import { MSAL_INSTANCE } from '@azure/msal-angular/constants';
//import { MsalService } from '@azure/msal-angular/msal.service';
//import { VdetailDataprocessComponent } from './pages/vdataproces/vdataprocess/vdetail-dataprocess/vdetail-dataprocess.component';

import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
//import { MsalGuard, MsalInterceptor, MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { MsalService, MSAL_INSTANCE, MsalModule } from '@azure/msal-angular';

import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

const isIE = window.navigator.userAgent.indexOf('MSIE') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export function MSALInstanceFactory() : IPublicClientApplication
{
  return new PublicClientApplication({
    auth: {
      clientId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          authority:'https://login.microsoftonline.com/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
          redirectUri:'/',
    }
  });
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    SharedModule,
    LoginModule,
    HttpClientModule,
    MsalModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory,
      //useClass: MsalInterceptor
    },
    MsalService
    /* Changes end here. */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
