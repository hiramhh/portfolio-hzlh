import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../modals/product-response';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private http = inject(HttpClient);
  private url = 'https://fakestoreapi.com';


  getAllProducts(): Observable<ProductResponse>{
    return this.http.get<ProductResponse>(`${this.url}/products`);
  }

}


  // updateProductQty(id: string,price: number, qt: number) : Observable<any>{
  //   return this.http.put<any>(`${this.url}/products/${id}`,{
  //     "id": 1,
  //     "title": "string",
  //     "price": 0.1,
  //     "description": "string",
  //     "category": "string",
  //     "image": "http://example.com"
  //   })
  // }
