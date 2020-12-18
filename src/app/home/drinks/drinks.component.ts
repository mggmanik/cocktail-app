import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit {

  baseFilters = [];
  categoryFilters = [];
  ingredientsFilters = [];
  glassFilters = [];

  drinks = [];

  isLoading = true;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private matSnackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchFilters('c');
    this.fetchFilters('g');
    this.fetchFilters('i');
    this.fetchFilters('a');

    this.route.queryParamMap.subscribe(paramMap => {
      const filter = { ...paramMap.keys };
      const selectedItem = paramMap.get(filter[0]);
      this.onFetchDrinks(filter[0], selectedItem);
    })
  }

  fetchFilters(filterName) {
    this.apiService.listFilterByFilterName(filterName).subscribe(res => {
      if (filterName === 'a') {
        this.baseFilters = [...res.drinks];
      }
      else if (filterName === 'c') {
        this.categoryFilters = [...res.drinks];
      }
      else if (filterName === 'i') {
        this.ingredientsFilters = [...res.drinks];
      }
      else if (filterName === 'g') {
        this.glassFilters = [...res.drinks]
      }
    })
  }

  onFetchDrinks(filter, selectedItem) {
    this.isLoading = true;
    this.apiService.fetchDrinksBySelectedFilter(filter, selectedItem).subscribe(res => {
      if (res && res.drinks) {
        this.drinks = res.drinks;
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
        this.matSnackbar.open('Some Problem Occurred.. Please Try Again !', 'OK', { duration: 3000 })
      }
    })
  }

}
