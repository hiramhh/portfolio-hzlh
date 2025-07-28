import { Component } from '@angular/core';
import { Product } from '../../modals/product';
import { ProductdbService } from '../../services/productdb.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductFormComponent } from '../product-form/product-form.component';



@Component({
  selector: 'app-product-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {


  // Es mejor hacer un objeto vacio para aprovechar el alto tipado de TS
  editProductItemFake: Product = {
    $key: '',
    name: '',
    category: '',
    description: '',
    id: 0,
    image: '',
    price: 0,
    rating: 0,
    title: '',
    date: '',
    quantity: 0,
    img: '',
    color: '',
    size: '',
    brand: ''
  };

  editProductItem: Product = this.editProductItemFake;
  productList: Product[] = [];
  tempList: Product[] = [];
  shortingList: Product[] = [];
  showColor = false;
  showSize = false;
  catlist: Product[] = [];

  checkList: string[]= [];
  productBrands: any[] = [];
  colorList: any[] = [];
  sizeList: any[] = [];

  colorCheckList: string[] = [];
  sizeCheckList: string[] = [];

  //modalRef: BsModalRef;

  constructor(
    private router: Router,
    private productDBService: ProductdbService,
    private matDialog: MatDialog
  ){}

  ngOnInit(){
    const data = this.productDBService.getAllProducts().subscribe({
      next: (data) => {
        this.productList = [];
       
        data.forEach((element: any) => {
          const list = element;
          list["$key"] = element.id;
          this.productList.push(list as Product);
        });

      },

      error: (err) => console.error('Error al getAllProduct ProductListComponent', err)
    });

    // this.getAllProduct();
  }

  addProduct(){
    this.router.navigate([]);
  }

  getAllProduct(){
    this.productDBService.getAllProducts().subscribe({
      next: (data) => {
        console.log("Hola mundo");
        
      },

      error: (err) => console.error('Error al getAllProduct ProductListComponent', err)
    });
  }


  // Filter

  category(e: Event) {
    let filter = (e.target as HTMLSelectElement).value.toLowerCase();
    let brands: String[] = [];
    let color: String[] = [];
    let size: String[] = [];

    if (filter === 'mobile' || filter === 'shoe' || filter === 'bag') {
      this.showColor = true;
      this.showSize = false;
    }
    else if (filter === 'tshirt' || filter === 'poloshort') {
      this.showColor = false;
      this.showSize = true;
    }
    else {
      this.showColor = false;
      this.showSize = false;
    }

    this.productList = [];


    let temp = this.tempList.filter( item => {
      if (item.category.toLowerCase() === filter) {
        return 1;
      }
      else {
        return 0;
      }
    })


    temp.forEach(item => {
      if (brands.indexOf(item.brand) === -1) {
        brands.push(item.brand)
      }

      if (color.indexOf(item.color) === -1) {
        brands.push(item.color)
      }

      if (size.indexOf(item.size) === -1) {
        brands.push(item.size)
      }

      if (brands.indexOf(item.brand) === -1) {
        brands.push(item.brand);
      }
    });

    this.productList = temp;
    this.catlist = temp;
    this.checkList = [];
    this.productBrands = brands;
    this.colorList = color;
    this.sizeList = size;
  }

  brands(e: Event){
    let color: any = [];
    let size: any = [];

    this.getAllProduct();

    let brand = (e.target as HTMLSelectElement).value;

    if ((e.target as HTMLInputElement).checked) {
      this.checkList.push(brand);
    } else {
      let i = this.checkList.indexOf(brand);
      this.checkList.splice(i, 1)
    }

    let list = [];

    for (let i = 0; i < this.checkList.length; i++) {
      for (let j = 0; j < this.tempList.length; j++) {
        if (this.tempList[j].brand === this.checkList[i]) {
          list.push(this.tempList[j])
        }
      }    
    }

    list.forEach(item => {
      if (color.indexOf(item.color) === -1) {
        color.push(item.color);
      }

      if (size.indexOf(item.size) === -1) {
        size.push(item.size)
      }
    });


    this.colorList = color;
    this.sizeList = size;
    this.productList = list;
    this.shortingList = list;

  }

  selectColor(e: Event){
    let filter = (e.target as HTMLSelectElement).value;

    if ((e.target as HTMLInputElement).checked) {
      this.colorCheckList.push(filter)
    } else {
      let i = this.colorCheckList.indexOf(filter);
      this.colorCheckList.splice(i, 1);
    }

    if (this.shortingList.length != 0) {
      this.filterColorList(this.shortingList);
    } else {
      this.filterColorList(this.catlist)
    }
  }


  selectSize(e: Event){

    let filter = (e.target as HTMLSelectElement).value.toLowerCase();

    if ((e.target as HTMLInputElement).checked) {
      this.sizeCheckList.push(filter)
    } else {
      let i = this.sizeCheckList.indexOf(filter);
      this.sizeCheckList.splice(i, 1);
    }

    console.log(this.sizeCheckList);
    

    if (this.shortingList.length != 0) {
      this.filterSize(this.shortingList)
    } else {
      this.filterSize(this.catlist);
    }

  }


  filterColorList(itemList: Product[]){
    this.productList = [];
    let list = [];

    for (let i = 0; i < this.colorCheckList.length; i++) {
      for (let j = 0; j < itemList.length; j++) {
        if (itemList[j].color === this.colorCheckList[i]) {
          list.push(itemList[j]);
        }
      }
    }
  }


  filterSize(itemList:Product[]){
    this.productList = [];

    var list = [];

    for (let i = 0; i < this.sizeCheckList.length; i++) {
      for (let j = 0; j < itemList.length; j++) {
        if (itemList[j].size.toLowerCase() == this.sizeCheckList[i].toLowerCase()) {
          list.push(itemList[j]);
        }
      }
    }
  }



  SubmitData(pform: any, key: any){
    let date = new Date();

    pform.value.date = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

    this.productDBService.updateProductQty(pform.value, key, 4);
  }

  openModal(template: any, product: any){
    console.log('Hola mundo');
    this.matDialog.open(ProductFormComponent);
    this.editProductItem = product;
  }


}
