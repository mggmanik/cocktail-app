import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.fetchFilters('c');
    this.fetchFilters('g');
    this.fetchFilters('i');
    this.fetchFilters('a');
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

}
