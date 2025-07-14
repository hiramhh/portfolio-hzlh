import { Component, Input } from '@angular/core';
import { ProductResponse } from '../../modals/product-response';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-product',
  imports: [CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
@Input() products!: ProductResponse;

// product: ProductResponse[] = [];

// constructor(
//   private productServise: ProductService 
// ){}

// ngOninit(): void{
//   this.productServise.getAllProducts().subscribe({
//     next: (data) => {
//       this.product = [data]

//     console.log(this.product);
//     },

//     error: (err) => console.error('Error fetching Products', err)
//   });
// }
}
