import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { JWTConstants } from '../constants/jwt-constants';
import { Role } from '../constants/role.constants';
import { UserInfo } from '../models/user-info';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username:string | undefined;
  password: string | undefined;
  isLoading: boolean = false;
  modalRef: BsModalRef<any> = new BsModalRef<any>();
  isInvalidUP:boolean = false;

  constructor(private router: Router, private authService: AuthService, private tokenService: TokenStorageService, private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  login(){
    this.isInvalidUP = false;
    this.isLoading = true;
    this.authService.login(this.username, this.password).subscribe(res => {
      this.isLoading = false;
      if(res.isValidUser){
        let token:any = res.jwtToken;
        this.tokenService.saveToken(token);
        let tokenBody = JSON.parse(atob(token.split('.')[1]));
        let user: UserInfo =<UserInfo> {UserName: tokenBody[JWTConstants.UserName], 
          Role:tokenBody[JWTConstants.Role],
          Id: tokenBody[JWTConstants.ID]
        };
        this.tokenService.saveUser(user);
        this.router.navigate(['/member']); 
        if(user.Role == Role.Admin){
          this.router.navigate(['/manager']); 
        }
        else if(user.Role == Role.Member){
          this.router.navigate(['/member']); 
        }
  
      }
      else {
        this.isInvalidUP = true;
      }
      
    })
  }

  goToRegistrationPage(){
    this.router.navigate(['/registration']); 
  }

}
