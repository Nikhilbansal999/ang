import { Component, OnInit, Output } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { NikhilService } from '../nikhil.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { EventEmitter } from 'protractor';
import { ShareService } from '../share.service';
import { PickService } from '../pick.service';
import { PasswordValidator } from './password.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private service: NikhilService, private data: ShareService, private local: PickService, private route: Router) {
  }
  form: any;
  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z][a-zA-Z\\s]+$")]),//nameValidator(/nikhil/)]),
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", Validators.required),
      password1: new FormControl("", Validators.required),
      mobile: new FormControl("", [Validators.required])
    }, { validators: PasswordValidator });
  }
  get name() { return this.form.get('name'); }
  get username() { return this.form.get('username'); }
  get email() { return this.form.get('email'); }
  get password() { return this.form.get('password'); }
  get password1() { return this.form.get('password1'); }
  get mobile() { return this.form.get('mobile'); }
  token: any;
  userDetails = {};
  arr = [{
    name: '',
    id: 123,
    class: 2,
    year: 12
  }];
  x = true;
  newDetails: any;
  phoneno = /^((?![0-5])[0-9]{10}$)/;
  emailTest = /[A-Za-z._0-9]{3,}@[A_Za-z]{3,}[.]{1}[A-Za-z.]{2,6}/;
  passwordTest = /(?=^.{8,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;.])(?!.*\s).*$/;
  onSubmit(d1: any, d2: any, d3: any, d4: any, d5: any) {
    console.log(d1, d2, d3, d4, d5);
    if (d1.value == ' ' || d1.value == '' || d2.value == '' || d2.value == ' ' || d3.value == '' || d3.value == ' ' || d4.value == '' || d4.value == ' ' || d5.value == ' ' || d5.value == '') {
      this.x = false;
      alert("Please fill all the credentials");
    }
    else {
      if (!this.phoneno.test(d5.value)) {
        alert("mobile number must be at least 10 digit and start with 6-9 ");
      } else {
        if (d3.value.length <= 6 || d3.value.length >= 20) {
          alert("password length must be between 7 to 20 character");
        } else {
          if (d3.value != d4.value) {
            alert("Password doesn't matched");
          } else {
            if (!this.emailTest.test(d2.value)) {
              alert("Please enter a valid email for example john.doe@gmail.com");
            } else {
              if (!this.passwordTest.test(d3.value)) {
                alert("Password should contain atleast 1 capital letter,1 number and special character");
              } else {
                this.route.navigate(['/login']);
                console.log(this.userDetails)
                this.service.reg(d1.value, d2.value, d3.value, d4.value, d5.value).subscribe((res: any) => {
                  this.userDetails = res;
                  console.log(res);
                  console.log(res['token']);
                  this.local.saveToken(res['token']);
                }, (err) => {
                  if (err.status === 403) {
                    alert(err.error.msg + " " + "please fill all the credentials again properly",);
                    console.log(err.token);
                  }
                });
              }
            }
          }
        }
      }
    }
  }
}
