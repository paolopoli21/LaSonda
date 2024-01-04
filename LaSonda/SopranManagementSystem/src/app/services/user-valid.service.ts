import { Injectable } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserValidService {

  constructor() { }

  noPasswordEquals(control: UntypedFormControl) :{[s :string]: boolean} {
    return {
      noPasswordEquals : true
    };
  }

  passwordMatchValidator(password: string, confirmPassword: string) {
    return (formGroup: UntypedFormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
          return true;
      } else {
        confirmPasswordControl.setErrors(null);
          return null;
      }
    };
  }
}
