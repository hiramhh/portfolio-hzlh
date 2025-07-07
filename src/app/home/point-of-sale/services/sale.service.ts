import { inject, Injectable } from '@angular/core';
import { Sale } from '../modals/sale';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  list: Sale [] = [];
  private http = inject(HttpClient)
  private url = 'https://fakestoreapi.in/api'

  addOrder(saleProduct: any){
    this.http.post<any>(`${this.url}/products${saleProduct}`, (null));
  }

  getOrder(): Observable<any>{
    return this.http.get<any>(`${this.url}/products`);
  }

  deleteOrder(){
    this.http.delete<any>(`${this.url}/products`);
  }
}
