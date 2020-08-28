import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginGuard } from '../services/guards/login.guard';
import { PointsComponent } from './points/points.component';
import { RechargesComponent } from './recharges/recharges.component';
import { ProfileComponent } from './profile/profile.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'points', canActivate: [LoginGuard], component: PointsComponent },
  { path: 'recharges', canActivate: [LoginGuard], component: RechargesComponent },
  { path: 'profile', canActivate: [LoginGuard], component: ProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
