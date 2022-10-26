import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {
  totalCount:number = 0;
  bigCurrentPage:number = 1;
  itemsPerPage: number = 5;

  projectName?: string;
  projectStartDate?: string;
  projectEndDate?: string;
  allocationPercentage?:number;

  name?:string;
  skills?:string;
  experience?:string;


  tasks: any[] = [];
  logInuserInfo: any;
  isLoading:boolean = false;

  constructor(private memberService: MemberService, private tokenService: TokenStorageService) { 

  }

  ngOnInit(): void {
    this.isLoading = true;
    this.logInuserInfo = this.tokenService.getUser();
    this.memberService.getTasks(this.logInuserInfo.Id).subscribe((tasks) => {
      if(tasks && tasks.length > 0){
        let task: any = tasks[0];
        this.projectName = task.projectName;
        this.projectStartDate = task.projectStartDate;
        this.projectEndDate = task.projectEndDate;
        this.allocationPercentage = task.allowcationPercentage;
        this.name = task.name;
        this.skills = task.skills;
        this.experience = task.yearsOfExperience;
        
        if(task.taskName && task.taskName.length > 0){
          this.tasks = tasks;
        }
        else{
          this.tasks = [];
        }
        
      }
      else
        this.tasks = [];
      this.totalCount = this.tasks.length;
      this.isLoading = false;
    });
  }

}
