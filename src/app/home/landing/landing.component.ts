import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
  }

  fetchDrinksByCategory(category: string) {
    this.apiService.fetchDrinksByCategory(category).subscribe(res => {
      console.log(res);
    })
  }

}
