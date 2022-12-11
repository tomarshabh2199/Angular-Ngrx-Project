import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { setLoadingSpinner } from 'src/app/store/shared/shared.actions';
import { signupStart } from '../state/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private store:Store<AppRoutingModule>) {

   }

  ngOnInit(): void {
    this.signUpForm= new FormGroup({
      email:new FormControl('' , [Validators.required,Validators.email]),
      password: new FormControl(' ', [Validators.required])
    });
  }

  onSignUpSubmit(){
    if(!this.signUpForm?.valid){
      return;
    }

    const email=this.signUpForm.value.email;
    const password=this.signUpForm.value.password;
    this.store.dispatch(setLoadingSpinner({status:true}))
    this.store.dispatch(signupStart({email,password}));

  }

}
