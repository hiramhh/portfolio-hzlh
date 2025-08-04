import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule ,NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  imports: [FormsModule, CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
  size: boolean = false;
  colorShow: boolean = false;
  uploadPercent: any;
  category: string = '';

  constructor(
    private dialogRef: MatDialogRef<ProductFormComponent>
  ){}

  uploadFile(e: Event){
    const file = (e.target as HTMLInputElement).files?.[0];
    const filePath = (e.target as HTMLInputElement).files?.[0].name;
    // const task = this.st

    console.log("Hola mundo");
    
  }

  closeDialog(){
    this.dialogRef.close();
  }

  submitData(form: NgForm){
    console.log("Hola mundo");
  }

  selectCategory(){
    console.log('Hola desde selectCategory');
    
  }

}
