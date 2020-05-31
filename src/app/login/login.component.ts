import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'db-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  host: {class: 'router-container'}
})

export class LoginComponent implements OnInit {
  formType = 'signIn';

  formControls = {
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required]),
  }

  formGroups = {
    resetPassword: this.formBuilder.group({
      email: this.formControls.email,
    }),
    signIn: this.formBuilder.group({
      email: this.formControls.email,
      password: this.formControls.password
    }),
    signUp: this.formBuilder.group({
      name: this.formControls.name,
      email: this.formControls.email,
      password: this.formControls.password,
      confirmPassword: this.formControls.confirmPassword
    }, {
      validator: this.checkPasswords()
    })
  }

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
  }

  checkPasswords() {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls.password;
      const matchingControl = formGroup.controls.confirmPassword;
      if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({'noMatch': true});
      } else {
        matchingControl.setErrors(null);
      }
    }
  }
}
