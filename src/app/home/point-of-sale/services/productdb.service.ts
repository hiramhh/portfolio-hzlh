import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductdbService {

  private http = inject(HttpClient);
  private url = 'https://fakestoreapi.com';


  getAllProducts(): Observable<any>{
    return this.http.get<any>(`${this.url}/products`);
  }

  updateProductQty(id: string,price: number, qt: number) : Observable<any>{
    return this.http.put<any>(`${this.url}/products/${id}`,{
      "id": 1,
      "title": "string",
      "price": 0.1,
      "description": "string",
      "category": "string",
      "image": "http://example.com"
    })
  }

}
