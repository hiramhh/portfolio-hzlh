import { Component, OnInit } from '@angular/core';
import { PontOfSaleService } from '../services/pont-of-sale.service';
import { Product } from '../modals/product';
import { SaleService } from '../services/sale.service';
import { Sale } from '../modals/sale';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-point-of-sale',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule],
  templateUrl: './point-of-sale.component.html',
  styleUrl: './point-of-sale.component.css'
})
export class PointOfSaleComponent implements OnInit {

  totalproduct: number = 0;
  totalSoldProducts: number = 0;
  p: number = 0;
  q: number = 0;

  tempPList: Product[] = [];
  ProductList: Product[] = [];
  saleList : Sale[] = [];
  tempList: Sale[] = [];

  canvas: any;
  ctx: any;

  constructor(
    private productDB :PontOfSaleService,
    private saleDB: SaleService
  ){

  }

  ngOnInit(): void {
    this.getProductList();
    this.getOrderData();

    this.salesAnalysis();

    throw new Error('Method not implemented.');
  }

  getProductList(){
    let buy: number = 0;
    let count: number = 0;
    
    this.productDB.getAllProduct().subscribe({
      next: (data) => {
        this.tempPList = [];
        data.forEach((element: Product) => {
          this.tempPList.push(element as Product)
        });

        let date = '/'+String(new Date().getMonth()+1)+'/';
        let year = '/'+String(new Date ().getFullYear()+1);
        this.ProductList = [];

        let temp = this.tempPList.filter( item => {
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


  getOrderData(){
    let sale = 0;
    this.saleDB.getOrder().subscribe({
      next: (data) => {
        this.tempList = [];
        data.forEach((element: Sale)=> {
          this.tempList.push(element as Sale);
        });

        let date = '/'+String(new Date().getMonth()+1)+'/';
        let year = '/'+String(new Date ().getFullYear()+1);
        this.saleList = [];

        let temp = this.tempList.filter( item => {
          if ((item.date.indexOf(date)>-1) && (item.date.indexOf(year)>-1)) {
            return 1;
          } else {
            return 0;
          }
        });

        this.saleList = temp;
        this.countSoldProduct(this.saleList);
        this.saleList.forEach(element =>{
          sale = (sale + element.totalPrice);
        });

        localStorage.setItem('sale', String(sale));

        
        
      },
      error: (err) => console.log('Error gettings proeducts', err)
    });
  }


  countSoldProduct(list: any){
    
    //console.log(list);
    ///  COUNT TOTAL SOLD PRODUCT //
    
    let count = 0;

    for (let i=0; i<list.length;i++){
      for (let j = 0; j < Object.keys(list[1].products).length; j++){
        let item = Object.values(list[i].products[j]);
       count = (count + Number(item[1]));
      }
    }
    this.totalSoldProducts = count;
  }

  semanal(){
    let date = new Date();
    let filtereDate =new Date().getDate()-7+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    let tdate = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    this.getOrderData();
    let list = this.saleList.filter( item => {
      if (item.date > filtereDate && (item.date <= tdate)) {
        return 1;
      }
      else {
        return 0;
      }
    });
  }

  mensual(){
    this.getOrderData();
    let list: Sale[] = [];

    let listFromStorage = localStorage.getItem('SaleList');

    list = listFromStorage ? JSON.parse(listFromStorage) : this.saleList;

  //   if(list.length  == 0){
  //     list = this.saleList;
  //   }
  //   else
  //   {
  //     // localStorage.setItem("SaleList", 'String')
  //     let listFromStorage = localStorage.getItem('SaleList');

  //     list = JSON.parse(listFromStorage);
  //   }

  let date = [];
  let qty: number = 0;
  let qtyList = [];

  for (let i = 0; i < date.length; i++) {
    date.push(list[i].date);
    for (let j = 0; j < Object.keys(list[i].products).length; j++) {
      qty = (qty + list[i].products[j].qty);
      console.log(qty);
    }
    qtyList.push(qty);
  }

  this.salesAnalysis(date, qtyList);
  console.log(qtyList);

  localStorage.setItem('saleDate',  JSON.stringify(date));
  localStorage.setItem('qtyList', JSON.stringify(qtyList));
  }


  revenueChart(){
    let value = [localStorage.getItem('buy'), localStorage.getItem('sale')];

    this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');

    let data = new Chart( this.ctx, {
      type: 'pie',
      data: {
        labels: ['Buy', 'Sale'],
        datasets:[{
          label: 'Revenue',
          data: value,
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    })
  }


  salesAnalysis(date?: any, qty?: any){
    let saleDate = date;
    let qtyList = qty;

    if ((saleDate == undefined) && (qtyList == undefined)) {

      let saleDateStorage = localStorage.getItem("saledate");
      saleDate =  saleDateStorage ? JSON.parse(saleDateStorage) : undefined;

      let qtyListStorage = localStorage.getItem("qtylist");
      qtyList = qtyListStorage ? JSON.parse(qtyListStorage) : undefined;
    }

    this.canvas = document.getElementById('saleChart');
    this.ctx = this.canvas.getContext('2d');

    
    let data = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: saleDate,
        datasets:[{
          label: 'Analisis de ventas',
          data: qtyList,
          backgroundColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(55, 206, 86, 1)',
          ],
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  }


}
