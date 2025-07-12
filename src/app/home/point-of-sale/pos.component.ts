import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pos',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './pos.component.html',
  styleUrl: './pos.component.css'
})
export class PosComponent {
  header: boolean = true;


  constructor(
    private router: Router
  ){

  }

}
