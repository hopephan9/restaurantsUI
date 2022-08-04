import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';



//need help
//import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
//import { InMemoryDataService } from './in-memory-data.service';

//import { HttpClientRestaurantsModule } from 'Restaurants';
//import { RestaurantsService } from './Restaurants.service';


//import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';

@NgModule({
  declarations: [
    AppComponent,
    RestaurantsComponent,
    RestaurantDetailComponent,
    MessagesComponent,
    DashboardComponent,
    RestaurantSearchComponent,
    HomeComponent,
    MapComponent,
  ],
  imports: [BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,

    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    // HttpClientRestaurantsModule.forRoot(
    //  RestaurantsService, { dataEncapsulation: false
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
