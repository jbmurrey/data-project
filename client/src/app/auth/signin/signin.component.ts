import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService:AuthService,private router:Router) { }
  authForm = new FormGroup({
    username:new FormControl(''),
    password: new FormControl('')
  })
  ngOnInit(): void {
  }
  onSubmit(){
    let credentials = {
      username: this.authForm.value.username,
      password: this.authForm.value.password,
    }
    this.authService.signin(credentials).subscribe({
      next:() =>{
        this.router.navigateByUrl('/home');
      },
      error:({error})=>{
        if(error.username || error.password){
          this.authForm.setErrors({credentials:true});
        }
      }
  });
  }
}
