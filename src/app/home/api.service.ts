import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // list all filters
  listFilterByFilterName(filterName) {
    const params = new HttpParams()
      .set(filterName, 'list');
    return this.http.get<any>(`${environment.apiUrl}/list.php`, { params });
  }

  // fetch drinks by selected filter
  fetchDrinksBySelectedFilter(filter, selectedItem) {
    const params = new HttpParams()
      .set(filter, selectedItem);
    return this.http.get<any>(`${environment.apiUrl}/filter.php`, { params });
  }

  // search drinks
  searchDrinks(searchValue) {
    const params = new HttpParams()
      .set('s', searchValue);
    return this.http.get<any>(`${environment.apiUrl}/search.php`, { params });
  }
}
