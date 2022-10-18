import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ApiHttpService {

  constructor(private http: HttpClient) { }

  post(url:string, obj:any): Observable<any> {
    return this.http.post(environment.apiURL + url, obj, httpOptions);
  }

  get(url:string): Observable<any> {
    return this.http.get(environment.apiURL + url, httpOptions);
  }

  put(url:string, obj:any): Observable<any> {
    return this.http.put(environment.apiURL + url, obj, httpOptions);
  }
}
