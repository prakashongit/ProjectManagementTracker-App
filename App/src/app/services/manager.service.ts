import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiHttpService } from '../helpers/api-http.service';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {
  
  

  constructor(private apiService: ApiHttpService) { }
  
  getUsers(managerid:number = 0):Observable<any>{
    return this.apiService.get('manager/list?userid='+managerid);
  }

  addUser(userDetails: any) {
    return this.apiService.post('manager/users', userDetails);
  }

  addTask(taskDetails: any) {
    return this.apiService.post('manager/assign-task', taskDetails);
  }

  updateAllocationPercentage(allocationPercentage: number, userId: any) {
    return this.apiService.put("manager/update?UserId="+ userId +"&AllocationPercentage="+ allocationPercentage,{});
  }
}
