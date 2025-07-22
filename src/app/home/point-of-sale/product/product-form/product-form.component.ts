import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-product-form',
  imports: [],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {

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

}
