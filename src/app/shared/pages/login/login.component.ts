import { CommonModule } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup,  ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseInputComponent } from '../../components/base-input/base-input.component';
import { CrudService } from '../../../core/services/crud/crud.service';
import { emailAuthReq, emailAuthRes } from '../../models/authReq';
import { Router } from '@angular/router';
import { UserinfoService } from '../../../core/services/userinfo/userinfo.service';
import { AuthService } from '../../../core/services/auth/auth.service';


@Component({
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,BaseInputComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private crudService:CrudService,
    private userinfo:UserinfoService,
  ) {
  }
  Loginform!: FormGroup;

  ngOnInit(

  ): void {
    
    this.Loginform = this.fb.group({
      email: ["", [
        Validators.required,
        Validators.email
      ]],
      password: ["", [
        Validators.required,
        Validators.minLength(5)
      ]]
    });

  }

  LoginSubmit(user: emailAuthReq){
    if(this.Loginform.valid)
      {
      this.login(user);
      }
  }

  login(data:emailAuthReq){
    this.crudService.post<emailAuthReq>({
      controller:'Auth',
      action:'Login'
    }, data ).subscribe((c:emailAuthRes)=>{
       if(c.requiredAuthenticatorType === 1)
        this.userinfo.setData(data);
        this.router.navigate(['/login/Activation']);
      });
  }


}


