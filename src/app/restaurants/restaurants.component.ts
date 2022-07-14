import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import { MessageService } from '../message.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})

export class RestaurantsComponent implements OnInit {
  selectedRestaurant?: Restaurant;

  restaurants: Restaurant[] = [];

  constructor(private route: ActivatedRoute, private restaurantService: RestaurantService, private messageService: MessageService) { }

  ngOnInit(): void {
    const options: any = {};
    const description = this.route.snapshot.paramMap.get('description');
    if(description){
      options['description__icontains'] = description;
    }
    const rating = this.route.snapshot.paramMap.get('rating');
    if(rating){
      options['rating__gte'] = rating;
    }
    const close = this.route.snapshot.paramMap.get('close');
    if(close){
      options['close__gt'] = close;
    }
    const open = this.route.snapshot.paramMap.get('open');
    if(open){
      options['open__lte'] = open;
    }
    const name = this.route.snapshot.paramMap.get('name');
    if(name){
      options['name__icontains'] = name;
    }
    this.getRestaurants(options);
  }

  getRestaurants(options?: any): void {
    this.restaurantService.getRestaurantsV2(options)
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.restaurantService.addRestaurant({ name } as Restaurant)
      .subscribe(restaurant => {
        this.restaurants.push(restaurant);
      });
  }

  onSelect(restaurant: Restaurant): void {
    this.selectedRestaurant = restaurant;
  }

  delete(restaurant: Restaurant): void {
    this.restaurants = this.restaurants.filter(h => h !== restaurant);
    this.restaurantService.deleteRestaurant(restaurant.id).subscribe();
  }
}
