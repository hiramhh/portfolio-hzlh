import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PontOfSaleService {

  private http = inject(HttpClient);
  private url = 'https://fakestoreapi.com/'

  constructor() { }

  getAllProduct(): Observable<any>{
    return this.http.get<any>(`${this.url}products`);
  }

}
