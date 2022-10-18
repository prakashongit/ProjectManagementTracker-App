import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiHttpService } from '../helpers/api-http.service';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // constructor(private http: HttpClient, private apiservice: ApiHttpService) { }
  constructor(private apiservice: ApiHttpService) { }

  checkUser(username: string, passcode: string,name:string): Observable<any> {
    // return this.http.post(environment.apiURL + 'Registration/status', {
    //   username,
    //   passcode,
    //   name
    // }, httpOptions);
    return this.apiservice.post('Registration/status', {
        username,
        passcode,
        name
      });
  }

  updateUser(username: string, passcode: string,name:string, password:string): Observable<any> {
    return this.apiservice.post('Registration/update', {
      username,
      passcode,
      name,
      password
    });
  }
}
