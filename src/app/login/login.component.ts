import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import * as firebase from 'firebase/app';
import 'firebase/auth';

import {AppService} from "../services/app.service";

@Component({
  selector: 'db-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  host: {class: 'router-container'}
})

export class LoginComponent implements OnInit {
  formType = 'signIn';
  redirectUrl = '';

  formControls = {
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl(null, [Validators.required]),
  }

  formGroups = {
    resetPassword: new FormGroup({
      email: this.formControls.email,
    }),
    signIn: new FormGroup({
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

  constructor(private activatedRoute: ActivatedRoute,
              private appService: AppService,
              private formBuilder: FormBuilder,
              private router: Router) {
    this.appService.addLoadComponent('auth-login-load')
  }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      this.activatedRoute.queryParams.subscribe(queryParams => {
        this.redirectUrl = queryParams.redirect || this.redirectUrl;
        this.appService.removeLoadedComponent('auth-login-load');
        if (user) {
          this.redirect(this.redirectUrl);
        }
      })
    })
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

  redirect(redirectUrl) {
    this.router.navigateByUrl(redirectUrl).then();
  }

  resetPassword() {
    if (this.formControls.email.value) {
      this.appService.addLoadComponent('reset');
      firebase.auth().sendPasswordResetEmail(this.formControls.email.value).then(() => {
        this.formType = 'signIn'
        this.appService.removeLoadedComponent('reset');
      })
    }
  }

  signUp() {
    if (this.formGroups.signUp.valid) {
      this.appService.addLoadComponent('sign-up');
      firebase.auth().createUserWithEmailAndPassword(this.formControls.email.value, this.formControls.password.value).then((userCredential) => {
        Promise.all([
          userCredential.user.updateProfile({
            displayName: this.formControls.name.value
          }),
          userCredential.user.sendEmailVerification()
        ]).then(() => {
          this.appService.removeLoadedComponent('sign-up');
          this.redirect(this.redirectUrl)
        })
      })
    }
  }

  signIn() {
    if (this.formControls.email.value && this.formControls.password.value) {
      this.appService.addLoadComponent('sign-in');
      firebase.auth().signInWithEmailAndPassword(this.formControls.email.value, this.formControls.password.value).then(() => {
        this.appService.removeLoadedComponent('sign-in');
        this.redirect(this.redirectUrl)
      })
    }
  }
}
