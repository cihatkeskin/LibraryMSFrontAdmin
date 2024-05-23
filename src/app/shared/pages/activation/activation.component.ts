import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseInputComponent } from '../../components/base-input/base-input.component';
import { Router } from '@angular/router';
import { CrudService } from '../../../core/services/crud/crud.service';
import { UserinfoService } from '../../../core/services/userinfo/userinfo.service';
import { emailAuthReq, emailAuthRes } from '../../models/authReq';
import { TokenService } from '../../../core/services/token/token.service';
import { AuthService } from '../../../core/services/auth/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent ],
  templateUrl: './activation.component.html',
  styleUrl: './activation.component.scss'
})
export class ActivationComponent implements OnInit  {

  LoginActivasionform!: FormGroup;
  userData!:emailAuthReq;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private crudService:CrudService,
    private userinfo:UserinfoService,
    private tokenservice:TokenService,
    private authService:AuthService
  ) {

  }
  ngOnInit(): void {
   this.userinfo.getData().subscribe(data =>{
    this.userData =data;
   });

    this.LoginActivasionform = this.fb.group({
      email: [this.userData.email],
      password: [this.userData.password],
      authenticatorCode: ["", [
        Validators.required
      ]]
    });
  }

  LoginActivasionSubmit(user:emailAuthReq){
    if(this.LoginActivasionform.valid)
      {
        this.crudService.post<emailAuthReq>({
          controller:'Auth',
          action:'Login'
        }, user ).subscribe((c:emailAuthRes)=>{
          this.tokenservice.setToken(c.accessToken.token);
          this.authService.getStaffFromAuth().subscribe({
            next: (staff) => {
              this.authService.userSubject.next(staff);
              this.authService.userSubject.value;
            },
          });
          this.router.navigate(['/admin/dashboard']);
          });
      }

  }
}
