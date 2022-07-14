import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Restaurant } from './restaurant';
//import { RESTAURANTS } from './mock-restaurants';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';

//import { Observable, throwError } from 'rxjs';
//import { catchError, retry } from 'rxjs/operators';
// Set our default options for each http call (headers, etc)
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private api='http://localhost:8000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public buildOptions(options?: any): HttpParams {
    if (options) {
      let params = new HttpParams();
      Object.keys(options).forEach(key => {
        const tmp = options[key];
        // If the options value is an array then we want to add multiple http parameters with the same key
        if (Array.isArray(tmp)) {
          // The value is an array so let's create a separate HttpParam for each value
          tmp.forEach(o => params = params.append(key, o));
        } else {
          // Value is not an array so create a single HttpParam for this key/value pair
          params = params.append(key, tmp);
        }
      });
      return params;

    } else {
      return new HttpParams();
    }
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getRestaurants(description?: string, name?: string, rating?: number, open?: number, close?: number): Observable<Restaurant[]> {
    let params = new HttpParams();
    if(description) {
      params = params.set('description__icontains', description);
    }

    if(rating) {
      params = params.set('rating__gte', rating);
    }

    if(open) {
      params = params.set('open__lte', open);
    }

    if(close) {
      params = params.set('close__gt', close);
    }

    if(name) {
      params = params.set('name__icontains', name);
    }

    return this.http.get<Restaurant[]>(`${this.api}/restaurant/`, {params})

  }

  getRestaurantsV2(options?: any): Observable<Restaurant[]>{
    const params = this.buildOptions(options);
    return this.http.get<Restaurant[]>(`${this.api}/restaurant/`, {params})
  }


  getRestaurant(id: number): Observable<Restaurant> {
    const url = `${this.api}/restaurant/${id}`;
    return this.http.get<Restaurant>(url).pipe(
      tap(_ => this.log(`fetched restaurant id=${id}`)),
      catchError(this.handleError<Restaurant>(`getRestaurant id=${id}`))
    );
  }

  getRestaurantNo404<Data>(id: number): Observable<Restaurant> {
    const url = `${this.api}/?id=${id}`;
    return this.http.get<Restaurant[]>(url)
      .pipe(
        map(restaurants => restaurants[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} restaurant id=${id}`);
        }),
        catchError(this.handleError<Restaurant>(`getRestaurant id=${id}`))
      );
  }

  searchRestaurants(term: string): Observable<Restaurant[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Restaurant[]>(`${this.api}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found restaurants matching "${term}"`) :
        this.log(`no restaurants matching "${term}"`)),
      catchError(this.handleError<Restaurant[]>('searchHeroes', []))
    );
  }

  //////// Save methods //////////

  /** POST: add a new restaurant to the server */
  addRestaurant(restaurant: Restaurant): Observable<Restaurant> {
    return this.http.post<Restaurant>(this.api, restaurant, this.httpOptions).pipe(
      tap((newRestaurant: Restaurant) => this.log(`added hero w/ id=${newRestaurant.id}`)),
      catchError(this.handleError<Restaurant>('addRestaurant'))
    );
  }

  /** DELETE: delete the restaurant from the server */
  deleteRestaurant(id: number): Observable<Restaurant> {
    const url = `${this.api}/${id}`;

    return this.http.delete<Restaurant>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted restaurant id=${id}`)),
      catchError(this.handleError<Restaurant>('deleteRestaurant'))
    );
  }

  /** PUT: update the restaurant on the server */
  updateRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.put(this.api, restaurant, this.httpOptions).pipe(
      tap(_ => this.log(`updated restaurant id=${restaurant.id}`)),
      catchError(this.handleError<any>('updateRestaurant'))
    );
  }



  /* old version
  getRestaurant(id: number): Observable<Restaurant> {
    //const restaurant = this.http.get<Restaurant>(`${this.api}/restaurant/`)
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const restaurant = RESTAURANTS.find(h => h.id === id)!;
    this.messageService.add(`RestaurantService: fetched restaurant id=${id}`);
    return of(restaurant);
  }
   */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a RestaurantService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RestaurantService: ${message}`);
  }
}
