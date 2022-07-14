import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { Restaurant } from '../restaurant';
import { RestaurantService } from '../restaurant.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-restaurant-search',
  templateUrl: './restaurant-search.component.html',
  styleUrls: [ './restaurant-search.component.css' ]
})
export class RestaurantSearchComponent implements OnInit {
  restaurants$!: Observable<Restaurant[]>;
  private searchTerms = new Subject<string>();

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(1000),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.router.navigateByUrl(`/name/${term}`)),
      ).subscribe();
  }
}
