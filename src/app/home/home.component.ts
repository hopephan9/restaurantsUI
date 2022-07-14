import { Component, OnInit } from '@angular/core';
import {Restaurant} from "../restaurant";
import {RestaurantService} from "../restaurant.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService) { }

  ngOnInit(): void {

    this.getRestaurants();
  }

  //top restaurants
  getRestaurants(): void {
  }

  /*border(): void {
    if (this.restaurant) {
      this.restaurantService.updateRestaurant(this.restaurant)
        .subscribe(() => this.goBack());
    }

   */

}
