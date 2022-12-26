import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CompanyCardComponent } from './components/company-card/company-card.component';
import { ApiRequestsService } from './services/api-requests.service';
import { CompaniesPageComponent } from './pages/companies-page/companies-page.component';
import { OffersPageComponent } from './pages/offers-page/offers-page.component';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { ReservedAreaPageComponent } from './pages/reserved-area-page/reserved-area-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CompanyCardComponent,
    CompaniesPageComponent,
    OffersPageComponent,
    IndexPageComponent,
    ReservedAreaPageComponent,
    RegisterPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ApiRequestsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
