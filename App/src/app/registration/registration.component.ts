import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  isLoading:boolean = false;
  isValidUser:boolean = false;
  success:boolean = false;
  invalidform:boolean = false;

  userName: string = "";
  name: string = "";
  passcode: string = "";
  password: string = "";
  confirmPassword: string = "";
  message: string = "";

  constructor(private router: Router, private memberService: MemberService) { }

  ngOnInit(): void {
  }

  checkUser(){
    this.isLoading = true;
    this.memberService.getStatus({"UserName": this.userName, 
    "Passcode": this.passcode, 
    "Name":this.name
    }).subscribe(data => {
      this.isLoading = false;
      if(data.code == 3){
        this.isValidUser = true;
        this.invalidform = false;
      }
      else
      {
        this.isValidUser = false; 
        this.invalidform = true;
        this.message = data.code == 2? "User doesn't exists" : "User already created";
      }
    })
  }

  updateUser(){
    this.isLoading = true;
    this.message = "password and confirm password are not same";
    this.memberService.updateUser(
      {"UserName": this.userName, 
"Passcode": this.passcode, 
"Name":this.name,
"Password":this.password
}
    ).subscribe(data => {
       this.success = true;
       this.isLoading = false;
    })
  }

  back(){
    if(!this.isValidUser)
        this.router.navigate(['/login']);
    else
      this.isValidUser = false;
  }
}
