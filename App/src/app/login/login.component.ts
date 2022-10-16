import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:string | undefined;
  password: string | undefined

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }

  login(){
    if(this.username == "manager"){
     this.router.navigate(['/manager']); 
    }
    else{
      this.router.navigate(['/member']); 
    }
  }

}
