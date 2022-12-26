import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexPageComponent } from './pages/index-page/index-page.component';
import { CompaniesPageComponent } from './pages/companies-page/companies-page.component';
import { OffersPageComponent } from './pages/offers-page/offers-page.component';
import { ReservedAreaPageComponent } from './pages/reserved-area-page/reserved-area-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [
  {path: '', component: IndexPageComponent},
  {path: 'companies', component: CompaniesPageComponent},
  {path: 'offers', component: OffersPageComponent},
  {path: 'reserved', component: ReservedAreaPageComponent},
  {path: 'register', component: RegisterPageComponent},
  {path: 'login', component: LoginPageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
