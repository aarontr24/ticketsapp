import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { PagesComponent } from './pages/pages.component';
import { RequestresetComponent } from './login/requestreset/requestreset.component';
import { ResponseResetComponent } from './login/response-reset/response-reset.component';


const routes: Routes = [
  { path: '', component: PagesComponent, loadChildren: './pages/pages.module#PagesModule'},
  { path: 'login', component: LoginComponent },
  { path: 'request-reset-password', component: RequestresetComponent},
  { path: 'response-reset-password/:token', component: ResponseResetComponent},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
