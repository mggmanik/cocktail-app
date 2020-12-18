import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularMaterialModule } from './../angular-material.module';
import { DrinksComponent } from './drinks/drinks.component';
import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [LandingComponent, DrinksComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule
  ]
})
export class HomeModule { }
