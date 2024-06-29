import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-testform',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './testform.component.html',
  styleUrl: './testform.component.scss'
})
export class TestformComponent {
onsubmit() {
  console.log(this.login.value);
  

}
login!:FormGroup

  // login=new FormGroup({
  //   username:new FormControl(('')),
  //   password:new FormControl((''))
  // });
  ngOnInit():void{

    this.login=new FormGroup({
      username:new FormControl('',[Validators.required,Validators.minLength(4)]),
      password:new FormControl('',[Validators.required,Validators.minLength(8)])
    });

  }

}
