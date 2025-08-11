import { Component } from '@angular/core';
import { ContactComponent } from "./contact/contact.component";

@Component({
  selector: 'app-intro',
  imports: [ContactComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {

}
