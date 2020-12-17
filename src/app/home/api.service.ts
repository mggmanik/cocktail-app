import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // filter drinks by category name
  fetchDrinksByCategory(category) {
    const params = new HttpParams()
      .set('c', category);
    return this.http.get<any>(`${environment.apiUrl}/filter.php`, { params })
  }
}
