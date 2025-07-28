import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../modals/product';

@Component({
  selector: 'app-card-product',
  imports: [CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
@Input() products!: Product;


}
