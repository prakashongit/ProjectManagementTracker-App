import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { Role, Roles } from 'src/app/constants/role.constants';
import { UserInfo } from 'src/app/models/user-info';
import { ManagerService } from 'src/app/services/manager.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-team-manager',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.scss']
})
export class TeamManagerComponent implements OnInit {
  isManagerList:boolean = false;
  isMemberList: boolean = true;
  highlightColorObj: any = 
  {"background-color": "#0d6efd",
  "color": "white",
  "padding": "3px",
  "cursor":"pointer"
  }

  notHighlightColorObj: any = 
  {
  "color": "black",
  "padding": "3px",
  "cursor":"pointer"
  }

  managerStyle: any;
  memberStyle:any;
  modalRef: BsModalRef<any> = new BsModalRef<any>();

  userName: string = "";
  name: string = "";
  passcode: string = "";
  password: string = "";
  confirmPassword: string = "";
  message: string = "";
  roleId: Roles = Roles.Admin;
  yearsOfExperience: number = 0;
  skills:string = "";
  
  logInuserInfo: UserInfo = <UserInfo>{};
  teamMembers:any[] = [];
  managers:any[] = [];
  totalCount:number = 0;
  bigCurrentPage:number = 1;
  itemsPerPage: number = 5;
  projectselected?: string;
  projects:any[] = [];
  projectid: any;
  startDate?: Date;
  endDate?: Date;
  description: any;
  allocationPercentage: number = 100;
  isSubmit: boolean = false;
  isValidSkills: boolean = false;
  isValidDate: boolean = false;
  isLoading: boolean = false;
  dismissible:boolean = true;
  currentUser:any = {};

  defaultAlerts: any[] = [
    {
      type: 'success',
      msg: `You successfully created user.`
    },{
      type: 'success',
      msg: `Task assigned successfully.`
    },{
      type: 'success',
      msg: `Allocation updated successfully.`
    },
    {
      type: 'success',
      msg: `Copied.`
    },
    {
      type: 'info',
      msg: `This alert needs your attention, but it's not super important.`
    },
    {
      type: 'danger',
      msg: `Better check yourself, you're not looking too good.`
    }
  ];
  alert = this.defaultAlerts[0];
  isUserCreated:boolean = false;
  isShowAlert:boolean = false;
  minDate: Date = new Date();
  maxDate?: Date;

  constructor(private modalService: BsModalService, 
    private managerService: ManagerService, 
    private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.managerStyle = this.notHighlightColorObj;
    this.memberStyle = this.highlightColorObj;
    this.logInuserInfo = this.tokenService.getUser();
    this.getMembers();
    this.projects = [{name: "project1", Id:1}, {name: "project2", Id:1}]
  }

  getManagers(){
    this.isManagerList = true; 
    this.isMemberList = false;
    this.managerStyle = this.highlightColorObj;
    this.memberStyle = this.notHighlightColorObj;
    this.managerService.getUsers().subscribe(data => {
      this.managers = data;
      this.totalCount = (this.managers && this.managers.length > 0)? this.managers.length : 0;
    })
  }

  getMembers(){
    this.isManagerList = false; 
    this.isMemberList = true;
    this.memberStyle = this.highlightColorObj;
    this.managerStyle = this.notHighlightColorObj;
    this.managerService.getUsers(this.logInuserInfo.Id).subscribe(data => {
      this.teamMembers = data;
      this.totalCount = (this.teamMembers && this.teamMembers.length > 0)? this.teamMembers.length : 0;
    })
  }

  openModal(template: TemplateRef<any>, isMember:boolean = true) {
    if(this.currentUser.userName){
      this.userName = this.currentUser.userName;
      this.allocationPercentage = this.currentUser.allowcationPercentage;
      this.maxDate = new Date(this.currentUser.endDate);
    }
    this.isSubmit = false;
    this.isLoading = false;
    this.isShowAlert = false;
    this.isUserCreated = false;
    
    let className: string = isMember? "modal-lg": "modal-md";
    const config: ModalOptions = { class: className };
    this.modalRef = this.modalService.show(template, config);
    if(isMember)
        this.passcode = this.generagePasscode(10);
    else
      this.userName = "";
  }

  addManager(){
    this.roleId = Roles.Admin;
    this.isSubmit = true;
    if(this.validateManagerDetails()){
      this.isLoading = true;
      this.managerService.addUser({
        "UserName": this.userName,
        "Password":this.password,
        "RoleId": this.roleId,
        "YearsOfExperience":this.yearsOfExperience,
        "Name":this.name
      }).subscribe(val => {
        this.isLoading = false;
        this.modalRef.hide();
        this.getManagers();
        this.isUserCreated = true;
      });
    }
  }

  validateManagerDetails():boolean {
    if(this.userName 
      && this.password 
      && this.confirmPassword 
      && this.name){
        if(this.password != this.confirmPassword)
          return false;
        return true;
      }
      else
        return false;
  }

  addMember(){
    this.roleId = Roles.Member;
    this.isSubmit = true;
    
    //Validations
    if(this.validateMemberDetails()){
      this.isLoading = true;
      this.managerService.addUser({
        "UserName": this.userName,
        "Passcode":this.passcode,
        "RoleId": this.roleId,
        "ProjectId": this.projectid,
        "StartDate":this.startDate?.toISOString(),
        "EndDate":this.endDate?.toISOString(),
        "Description": this.description,
        "Skills":this.skills,
        "AllowcationPercentage": this.allocationPercentage,
        "YearsOfExperience":this.yearsOfExperience,
        "ManagerId": +this.logInuserInfo.Id
      }).subscribe(val => {

        this.isLoading = false;
        this.modalRef.hide();
        this.isUserCreated = true;

        this.userName = "";
        this.description = "";
        this.skills = "";
        this.yearsOfExperience = 0;
        this.projectselected = undefined;
      });
    }
  }

  validateMemberDetails():boolean {
    if(this.userName 
      && this.passcode 
      && this.skills 
      && this.description){
        if(this.skills.split(',').length > 2)
          this.isValidSkills = true;
        else
          this.isValidSkills = false;

        if(this.yearsOfExperience >= 4){
          if(!this.projectselected)
               return false;
               
          if(!this.startDate || !this.endDate){
              return false;
          }

          if(this.startDate > this.endDate)
            this.isValidDate = false;
          else
            this.isValidDate = true;
        }

        return this.isValidSkills && this.isValidDate;
      }
      else
        return false;
  }

  generagePasscode(length:number):string{
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
   charactersLength));
     }
     return result;
  }

  typeaheadOnSelect(event:any){
    this.projectid = event.item.Id;
  }

  assign(){
    this.isSubmit = true;
    let taskDetails: any = {
      "TaskName":this.name,
      "StartDate": this.startDate?.toISOString(), 
      "EndDate": this.endDate?.toISOString(),
      "Deliverables":this.description,
      "UserId": this.currentUser.userId
      };

      if(this.validateTaskDetails()){
        this.isLoading = true;

        this.managerService.addTask(taskDetails).subscribe(data => {
          this.alert = this.defaultAlerts[1];
          this.isLoading = false;
          this.modalRef.hide();
          this.isUserCreated = true;
          this.name = "";
          this.description = "";
          this.startDate = undefined;
          this.endDate = undefined;
        });
      }
      else{
        console.log("Invalid data");
      }
      
  }

  validateTaskDetails() {
    if(this.name 
      && this.description 
      && this.startDate 
      && this.endDate){
        if(this.startDate > this.endDate)
          this.isValidDate = false;
        else
          this.isValidDate = true;

        return this.isValidDate;
      }
      else
        return false;
  }

  updateAllocationPercentage(){
    this.isLoading = true;
    this.managerService.updateAllocationPercentage(this.allocationPercentage, this.currentUser.userId).subscribe(data => {
      this.isLoading = false;
      this.alert = this.defaultAlerts[2];
      this.isUserCreated = true;
      this.modalRef.hide();
      this.getMembers();
    });
  }

  // copy(data:string){
  //   this.alert = this.defaultAlerts[3];
  //   this.isShowAlert = true;
  //   console.log("Copied....")
  // }

  checkProjectAssignment() : boolean {
    return this.yearsOfExperience >= 4;
  }

}
