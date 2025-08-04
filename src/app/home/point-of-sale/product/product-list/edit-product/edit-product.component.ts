import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  imports: [FormsModule, AsyncPipe, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent {

editProductItem: any;
uploadPercent: any;


  submitData(pform: any, param2: any){
    alert("Hello from submit data");
  }


  uploadFile(e: Event){
    alert("Hello from uploadFile")
  }
}
