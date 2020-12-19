import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-drink',
  templateUrl: './drink.component.html',
  styleUrls: ['./drink.component.scss']
})
export class DrinkComponent implements OnInit {

  // fetched drink info
  drinkId;
  drink;

  // for showing spinner
  isLoading = true;

  // ingredients image url
  imgUrl = "https://www.thecocktaildb.com/images/ingredients/";

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('_id')) {
        return;
      }
      this.drinkId = paramMap.get('_id');
      this.apiService.fetchDrinkById(this.drinkId).subscribe(res => {
        if (res && res.drinks && res.drinks[0]) {
          let tempArray = [];
          this.drink = res.drinks[0];
          let i = 1;
          for (let key in this.drink) {
            if (key.includes('strIngredient')) {
              if (this.drink[key]) {
                tempArray.push(
                  {
                    ['ingredient']: this.drink[key],
                    ['measure']: this.drink['strMeasure' + i]
                  })
                i++;
              }
            }
          }
          this.drink = {
            ...this.drink,
            ingredients: [...tempArray]
          }
          this.isLoading = false;
        }
        else {
          this.matSnackBar.open('No Drink Found !', 'OK', { duration: 3000 })
        }
      })
    })
  }

}
