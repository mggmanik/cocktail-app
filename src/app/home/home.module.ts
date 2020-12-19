import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from './../angular-material.module';
import { DrinksComponent } from './drinks/drinks.component';
import { HomeRoutingModule } from './home-routing.module';
import { LandingComponent } from './landing/landing.component';
import { DrinkComponent } from './drink/drink.component';



@NgModule({
  declarations: [LandingComponent, DrinksComponent, DrinkComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    FormsModule
  ]
})
export class HomeModule { }
