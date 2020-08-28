import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PointsComponent } from './points/points.component';
import { RechargesComponent } from './recharges/recharges.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumberDirective } from '../shared/only-number.directive';
import { HistoryComponent } from './history/history.component';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    PointsComponent,
    RechargesComponent,
    ProfileComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
