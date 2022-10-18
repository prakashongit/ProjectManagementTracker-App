import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment';
import { ApiHttpService } from '../helpers/api-http.service';

// const httpOptions = {
//   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
// };

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // constructor(private http: HttpClient) { }
  constructor(private apiservice: ApiHttpService) { }

  login(username: string | undefined, password: string | undefined): Observable<any> {
    return this.apiservice.post('auth/token', {
      username,
      password
    });
  }
}
