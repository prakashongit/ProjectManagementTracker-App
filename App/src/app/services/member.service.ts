import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from '../helpers/api-http.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private apiService: ApiHttpService) { }

  getTasks(userid: number): Observable<any> {
    return this.apiService.get("member/tasks?userid="+userid);
  }

  getStatus(details: any): Observable<any> {
    return this.apiService.post("Registration/status", details);
  }

  updateUser(details: any): Observable<any> {
    return this.apiService.post("Registration/update", details);
  }
}
