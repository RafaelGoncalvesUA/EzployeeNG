import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { CompaniesPageComponent } from './pages/companies-page/companies-page.component';
import { OffersPageComponent } from './pages/offers-page/offers-page.component';
import { ReservedAreaPageComponent } from './pages/reserved-area-page/reserved-area-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { CompanyPageComponent } from './pages/company-page/company-page.component';
import { OfferPageComponent } from './pages/offer-page/offer-page.component';
import { RegisterCompanyPageComponent } from './pages/register-company-page/register-company-page.component';
import { CommentsPageComponent } from './pages/comments-page/comments-page.component';


const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'companies', component: CompaniesPageComponent},
  {path: 'companies/:id', component: CompanyPageComponent},
  {path: 'comments', component: CommentsPageComponent},
  {path: 'offers', component: OffersPageComponent},
  {path: 'offers/:id', component: OfferPageComponent},
  {path: 'reserved', component: ReservedAreaPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'register_company', component: RegisterCompanyPageComponent},
  {path: 'login', component: LoginPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
