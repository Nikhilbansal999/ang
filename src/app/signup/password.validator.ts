import { AbstractControl, ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";


export function PasswordValidator(control:AbstractControl):{[key:string]:boolean}|null {
    const password = control.get('password');
    const password1 = control.get('password1');
  
    return password && password1 && password.value != password1.value ? { 'Password': true } : null;
  };