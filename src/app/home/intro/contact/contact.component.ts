import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  mailForm: FormGroup;

  constructor(){
    this.mailForm = new FormGroup({
      name: new FormControl(''),
      mail: new FormControl(''),
      message: new FormControl('')
    })
  }

  sendMail(){
    alert('Hola para mandar correos')
  }
}
