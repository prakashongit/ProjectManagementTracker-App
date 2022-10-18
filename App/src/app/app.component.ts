import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from './models/user-info';
import { TokenStorageService } from './services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  title = 'App';
  isUserLogin:boolean = false;
  username: string = "";

  constructor(private tokenService: TokenStorageService, private router: Router){}

  ngOnInit(): void {
    this.tokenService.UserNameIn$.subscribe(name => {
      this.username = name;
    });

    this.tokenService.isUserSignIn$.subscribe((val) => {
        this.isUserLogin = val;
    });

    if(this.tokenService.getToken()){
      this.isUserLogin = true;
    }

    let user: UserInfo = this.tokenService.getUser();
    
    if(user && user.UserName)
        this.username = user.UserName;
  }

  signOut(){
    this.tokenService.signOut();
    this.isUserLogin = false;
    this.router.navigate(['/login']);
  }
}
