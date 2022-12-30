import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

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
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { OfferPageComponent } from './pages/offer-page/offer-page.component';
import { RegisterCompanyPageComponent } from './pages/register-company-page/register-company-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterCompanyComponent } from './components/register-company/register-company.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './components/comment/comment.component';
import { ReplyComponent } from './components/reply/reply.component';
import { CommentsComponent } from './components/comments/comments.component';
import { AuthenticationService } from './services/authentication.service';
import { CommentAreaComponent } from './components/comment-area/comment-area.component';
import { ReplyAreaComponent } from './components/reply-area/reply-area.component';
import { CommentsService } from './services/comments.service';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { EditCompanyComponent } from './components/edit-company/edit-company.component';
import { NewOfferComponent } from './components/new-offer/new-offer.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

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
    LoginPageComponent,
    OfferCardComponent,
    CompanyPageComponent,
    OfferPageComponent,
    RegisterCompanyPageComponent,
    LoginComponent,
    RegisterComponent,
    RegisterCompanyComponent,
    CommentComponent,
    ReplyComponent,
    CommentsComponent,
    CommentAreaComponent,
    ReplyAreaComponent,
    CompanyInfoComponent,
    UserInfoComponent,
    EditCompanyComponent,
    NewOfferComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiRequestsService,
    AuthenticationService,
    CommentsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
