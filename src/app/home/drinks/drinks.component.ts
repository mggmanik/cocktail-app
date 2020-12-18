import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ApiService } from './../api.service';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent implements OnInit, AfterViewInit {

  // all the filters in the left
  baseFilters = [];
  categoryFilters = [];
  ingredientsFilters = [];
  glassFilters = [];

  // populate drinks array
  drinks = [];

  // alphabets array
  alphabets = [];

  // for showing spinner
  isLoading = true;

  // for getting access to the input for searching
  @ViewChild('input') input: ElementRef;
  searchText: string;

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
    this.populateAlphabets();

    this.route.queryParamMap.subscribe(paramMap => {
      const filter = { ...paramMap.keys };
      const selectedItem = paramMap.get(filter[0]);
      this.onFetchDrinks(filter[0], selectedItem);
    })
  }


  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          const searchValue = this.input.nativeElement.value;
          if (searchValue) {
            this.isLoading = true;
            this.apiService.searchDrinks(searchValue).subscribe(res => {
              if (res && res.drinks) {
                this.drinks = res.drinks;
                this.isLoading = false;
              }
              else {
                this.isLoading = false;
                this.drinks = [];
                this.matSnackbar.open('Try Searching or Filter through the left !', 'OK', { duration: 3000 })
              }
            })
          }
          else {
            this.drinks = [];
            this.matSnackbar.open('Try Searching or Filter through the left !', 'OK', { duration: 3000 })
          }
        })
      )
      .subscribe();
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
    this.searchText = '';
    this.isLoading = true;
    this.apiService.fetchDrinksBySelectedFilter(filter, selectedItem).subscribe(res => {
      if (res && res.drinks) {
        this.drinks = res.drinks;
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
        this.drinks = [];
        this.matSnackbar.open('Try Searching or Filter through the left !', 'OK', { duration: 3000 })
      }
    })
  }

  populateAlphabets() {
    let i = 65;
    let j = 91;

    for (let k = i; k < j; k++) {
      const letter = String.fromCharCode(k);
      this.alphabets.push(letter);
    }
  }

  fetchDrinksByFirstLetter(letter) {
    this.searchText = '';
    this.isLoading = true;
    this.apiService.searchDrinksByFirstLetter(letter).subscribe(res => {
      if (res && res.drinks) {
        this.drinks = res.drinks;
        this.isLoading = false;
      }
      else {
        this.isLoading = false;
        this.drinks = [];
        this.matSnackbar.open('Try Searching or Filter through the left !', 'OK', { duration: 3000 })
      }
    })
  }

}
