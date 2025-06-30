import { Component, OnInit } from '@angular/core';
import { PontOfSaleService } from './services/pont-of-sale.service';
import { Product } from './modals/product';

@Component({
  selector: 'app-point-of-sale',
  standalone: true,
  imports: [],
  templateUrl: './point-of-sale.component.html',
  styleUrl: './point-of-sale.component.css'
})
export class PointOfSaleComponent implements OnInit {

  totalproduct: number = 0;
  tempList: Product[] = [];
  ProductList: Product[] = [];

  constructor(
    private productDB :PontOfSaleService
  ){

  }

  ngOnInit(): void {
    this.getProductList();
    throw new Error('Method not implemented.');
  }

  getProductList(){
    let buy: number = 0;
    let count: number = 0;
    
    this.productDB.getAllProduct().subscribe({
      next: (data) => {
        this.tempList = [];
        data.forEach((element: Product) => {
          this.tempList.push(element as Product)
        });

        let date = '/'+String(new Date().getMonth()+1)+'/';
        let year = '/'+String(new Date ().getFullYear()+1);
        this.ProductList = [];

        let temp = this.tempList.filter( item => {
          if ((item.date.indexOf(date)>-1) && (item.date.indexOf(year)>-1)) {
            return 1;
          } else {
            return 0;
          }
        });

        this.ProductList = temp;

        this.ProductList.forEach(item => {
          count = count+item.quantity;
        })

        this.ProductList.forEach(element =>{
          buy = (buy + (element.price * element.quantity));
        });

        localStorage.setItem("buy", String(buy))

        this.totalproduct = count;

      },


      error: (err) => console.log('Error fetching products', err)
    });
  }


  semanal(){
    alert("Hola desde semanal");
  }

  mensual(){
    alert("Hola desde mensual");
  }
}
