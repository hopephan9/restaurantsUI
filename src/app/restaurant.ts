import { HttpClient, HttpHeaders } from '@angular/common/http';
export interface Restaurant {
  id: number;
  name: string;
  description: string;
  chain: boolean;
  rating: number;
  address: string;
  open: string;
  close: string
  url: string;
}
