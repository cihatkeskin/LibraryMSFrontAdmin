import { Component, OnInit } from '@angular/core';
import { IStaff } from '../../shared/models/staff';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertifyService, MessageType, Position } from '../../core/services/alertify/alertify.service';
import { CrudService } from '../../core/services/crud/crud.service';
import { catchError, ReplaySubject, throwError } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { BaseInputComponent } from '../../shared/components/base-input/base-input.component';
import { AuthService, LibraryResponse } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-usersettings',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent],
  templateUrl: './usersettings.component.html',
  styleUrl: './usersettings.component.scss',
  providers:[DatePipe]
})
export class UsersettingsComponent implements OnInit{
  staffId!:string;
  staff!:IStaff;
  user!:LibraryResponse;
  updateStaffForm!:FormGroup;
  controller="LibraryStaffs";
  /**
   *
   */
  constructor(
    private fb: FormBuilder,
    private alertify:AlertifyService,
    private activatedRoute:ActivatedRoute,
    private crudservice:CrudService,
    private router: Router,
    public datepipe: DatePipe,
    private authService:AuthService
  ) {
    this.activatedRoute.data.subscribe(res=>{
      var gettingData:ReplaySubject<any> = res['data'] ;
      gettingData.subscribe((dd:IStaff)=>{
        this.createForm(dd);
        this.staff =dd;
      })
    });
  }
  ngOnInit(): void {

  }
  createForm(staff:IStaff){
    console.log(staff);
    this.updateStaffForm = this.fb.group({
      id: [staff.id, [
        Validators.required
      ]],
      birthDate: [this.datepipe.transform(new Date (staff.birthDate),'yyyy-MM-dd'), [
        Validators.required
      ]],
      email: [staff.email, [
        Validators.required
      ]],
      file: [staff.file, [
        Validators.required
      ]],
      firstName: [staff.firstName, [
        Validators.required
      ]],
      lastName: [staff.lastName, [
        Validators.required
      ]]
    });
  }

  getParamsId():string{
    let id:string="";
    this.activatedRoute.params.subscribe(params=>{
        id = params['id'];
    });
    return id;
  }

  UpdateBookSubmit(data:IStaff){
    this.user = this.authService.userSubject.value;
    const formData = new FormData();
    const getFileSource = this.updateStaffForm.get('file')?.value

    if(getFileSource ){
      formData.append("file",getFileSource);
      formData.append("id",data.id);
      formData.append("birthDate",`${data.birthDate}`);
      formData.append("email",data.email!);
      formData.append("firstName",data.firstName);
      formData.append("lastName",data.lastName!);
    }
    if(this.updateStaffForm.valid){
    this.crudservice.put({controller:this.controller},formData).pipe(catchError((err:HttpErrorResponse)=>{
      return throwError(() => {
        this.alertify.message(err.error.mesage, { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 });
      });
    })).subscribe((data)=>{
    // this.user.imageUrl = data.get('file') as string;
    this.alertify.message('Success Updated', { messageType: MessageType.Success, position: Position.TopCenter, delay: 2 });
    this.router.navigate(['/admin/book']);
    })      
    }else{
    this.alertify.message('Please Fill All Blanks', { messageType: MessageType.Error, position: Position.TopCenter, delay: 2 })
    }
  }

  uploadImage(data:any){
    const image =data.target.files[0];
    this.updateStaffForm.patchValue(
       {file:image}
    )
   }
}
