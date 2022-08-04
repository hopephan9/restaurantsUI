import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import {HomeComponent} from "./home/home.component";
import {MapComponent} from "./map/map.component";

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'map', component: MapComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: RestaurantDetailComponent },
  { path: 'restaurants', component: RestaurantsComponent },
  { path: 'name/:name', component: RestaurantsComponent },
  { path: 'rating/:rating', component: RestaurantsComponent },
  { path: 'open/:open', component: RestaurantsComponent },
  { path: 'close/:close', component: RestaurantsComponent },
  { path: 'description/:description', component: RestaurantsComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
