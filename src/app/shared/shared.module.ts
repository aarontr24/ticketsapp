import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { OnlyNumberDirective } from './only-number.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    OnlyNumberDirective
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    OnlyNumberDirective
  ]
})
export class SharedModule { }
