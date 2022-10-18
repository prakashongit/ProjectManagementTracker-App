import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserInfo } from '../models/user-info';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  isUserSignIn$ = new Subject<boolean>();
  UserNameIn$ = new Subject<string>();
  isUserSignIn: boolean = false;
  constructor() { 
    this.isUserSignIn$.next(false);
  }

  signOut(): void {
    this.isUserSignIn$.next(false);
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.isUserSignIn$.next(true);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: UserInfo): void {
    this.UserNameIn$.next(user.UserName);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}
