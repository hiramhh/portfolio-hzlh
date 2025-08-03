import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../modals/product';
import { CommonModule } from '@angular/common';
import { OrderProduct } from '../../modals/order-product';
import { Sale } from '../../modals/sale';
import { SaleService } from '../../services/sale.service';
import { ProductService } from '../../services/product.service';
import { ProductdbService } from '../../services/productdb.service';
import { CardProductComponent } from '../card-product/card-product.component';
import { ProductResponse } from '../../modals/product-response';

@Component({
  selector: 'app-order',
  imports: [CommonModule, CardProductComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit{
  showSize: boolean = false;
  showColor: boolean = false;
  showBrands: boolean = false;

  keyList: Product[] = [];

  colorList: any[] = [];
  sizeList: any[] = [];

  sale: Sale = new Sale()
  tempList: Product[] = [];
  productList: any[] = [];  //Se tiene  que cambiar el type para que coincida con ProductResponse y manejar mejor el tipado en selectItem()
  product: Product[] = [];

  subTotal: number = 0;
  totalPrice: number = 0;
  vat: number = 0;

  tempPrice: any[] = [];
  selectProductList: Product[] = [];
  sortingList: Product[] = [];
  productBrands: Product[] = [];
  saleProducts: OrderProduct[] = []
  productResponse: ProductResponse[] = []; 

  filteredProductList: Product []= [];

  productService: ProductService = inject(ProductService);


  constructor(
    // private productService: ProductService,
    private productdbService: ProductdbService,
    private ps: ProductService,
    private saleService: SaleService
  ){}


  ngOnInit(){
  this.productService.getAllProducts().subscribe({
    next: (data) => {
    this.productResponse = Object.values(data)
    this.priceRounding();
    this.filteredProductList = this.productList;
    this.getAllProduct();
    },

    error: (err) => console.error('Error fetching Products', err)
  });

  }

  getAllProduct(){
    this.tempList = [];

    this.productResponse.forEach((element: any) => {
      const list = element;
      list['$key'] = element.id;
      this.tempList.push(list as Product);
    });

   }

   priceRounding(){
    this.productList = this.productResponse.map((item: any) => {
        let spare = item.price % 5;
        let newPrice = item.price;

      if (spare === 0) {
        newPrice = item.price;
      } else {
        if (spare <= 2) {
          newPrice = item.price - spare;
        }
        else {
          let sum = 5 - spare;
          newPrice = item.price + sum;
        }
      }

      return {...item, price: newPrice};
    });

    console.log(this.productList);
    
   }

  selectItem(title: string, id: number){

    const exist = this.selectProductList.some(item => item.id === id);
    console.log(this.productList);
    

    if (!exist) {
      this.selectProductList.push(this.productList.find( item => item.id === id));

      // this.keyList.push(id);

      this.getTotal(this.selectProductList);
      this.setTempPrice();
      // return this.selectProductList;
    console.log(this.selectProductList);
    
    } else {
      alert("duplicate Product");
    }    
  }


  getTotal(productList: Array<Product>): any {
    let item;
    let subTotalArray: Array<number> = productList.map(item => item.price);
    this.subTotal = subTotalArray.reduce((accumalator, item) => accumalator + item);
    this.vat = (1/10) * this.subTotal;
    this.totalPrice = this.subTotal + this.vat;
  }


  quantity(e: any,index: number) {
    this.tempPrice[index].qty = Number(e.target.value);
    let price = 0;
    for (let i = 0; i < this.selectProductList.length; i++) {
      price = (price + (this.selectProductList[i].price * this.tempPrice[i].qty))
    }
    this.subTotal = price;
    this.vat = (1/10) * this.subTotal;
    this.totalPrice = this.subTotal + this.vat;
  }


  setTempPrice(){
    let item;

    if (this.tempPrice == null){
      this.tempPrice = [];

      for (let i = 0; i < this.selectProductList.length; i++) {
        item = {
          id: i,
          qty: 1
        }

        this.tempPrice.push(item);
      }
    } else {
      item = {
        id: (this.tempPrice.length) + 1 ,
        qty: 1
      }
      this.tempPrice.push(item);
    }
  }


  delete(index: number, key: any){
    let price = this.tempPrice[index].qty * this.selectProductList[index].price;

    this.subTotal = this.subTotal - price;
    this.vat = (1/10) * this.subTotal;
    this.totalPrice = this.subTotal + this.vat;
    this.selectProductList.splice(index, 1);
    this.tempPrice.splice(index, 1);
    this.keyList.splice(index, 1);
  }


  // filter....
  category(e: Event){
    let brands: any[] = [];
    let color: any[] = [];
    let size: any[] = [];

    let filter: string = (e.target as HTMLInputElement).value.toLowerCase();
    
    this.showBrands = true;

    if (filter === 'mobile' || filter==='shoe' || filter==='bag') {
      this.showColor = true;
      this.showSize = false;
    } else if (filter === 'womenClothing' || filter === 'menClothing') {
      this.showColor = false;
      this.showSize = true;
    } else {
      this.showColor = false;
      this.showSize = false;
    }


    if (filter === '') {
      this.filteredProductList = this.productList;
    } else{
      this.filteredProductList = this.productList.filter(item =>
        item.category.toLowerCase() === filter
      )
    }




    this.sortingList.filter( item =>  {
      if (color.indexOf(item.color) == -1) {
        color.push(item.color);
      }

      if (size.indexOf(item.size) == -1) {
        size.push(item.size);
      }

      if (brands.indexOf(item.brand) == -1) {
        brands.push(item.brand);
      }
    });

    this.colorList = color;
    this.sizeList = size;
    this.productBrands = brands;

    console.log(this.sizeList);
    
  }

  brands(e: any){

    let temp;
    this.productList = this.sortingList;
    temp = this.productList.filter( item => {
      if (item.brand == e.target.value) {
        return 1;
      } else {
        return 0;
      }
    });

    this.productList = temp;
  }





  order(){
    let date = new Date();
    this.sale.date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    // generate Ramdom Id
    let id: any = String(Math.random().toString(36).slice(2, 4) + String(Math.round(Math.random() * 1000)));
    this.sale.orderId = id;
    this.sale.totalPrice = this.totalPrice;

    for (let i = 0; i <this.selectProductList.length; i++) {
      let saleProduct: OrderProduct = new OrderProduct();
      saleProduct.name = this.selectProductList[i].name;
      saleProduct.qty = this.tempPrice[i].qty;
      this.saleProducts.push(saleProduct);

      // sold item subtract from porduct list

      let key = this.selectProductList[i].name;
      this.productList.forEach(item => {
        if (item.$key === key ) {
          this.productdbService.updateProductQty(key, saleProduct.qty, item.quantity);
        }
      });
    }

    this.sale.products = this.saleProducts;

    if (this.sale.products.length === 0) {
      alert("Select your product 1st")
    } else {
      localStorage.setItem('sale', JSON.stringify(this.sale))
      // this.saleService.addOrder(this.sale);
      this.clearBucket();
    }
  }

  clearBucket(){
    this.selectProductList = [];
    this.subTotal = 0;
    this.vat = 0;
    this.totalPrice = 0;
  }
}
