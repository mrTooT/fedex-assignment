import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordError, SignUpDetails } from './sign-up.model';
import { SignUpService } from '../services/sign-up.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'fedex-assignment-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [SignUpService],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  public isLoading = false;
  public invalidBookingNumber = false;
  public firstName = signal<string>('');
  public lastName = signal<string>('');
  public password = '';
  public email = signal<string>('');
  public passwordIsStrong = true;
  public passwordError: PasswordError | null = null;

  constructor(
    private signUpService: SignUpService, 
    private router: Router) {
    effect(() => {
      console.log(`Firstname: ${this.firstName()}`);
      console.log(`Lastname: ${this.lastName()}`);
      console.log(`password: ${this.password}`);
      if (this.firstName() !== '' || this.lastName() !== '' ) {
        this.passwordIsStrong = this.checkpasswordStrengh(this.password);
      }
    });
  }
  
  onFirstNameChange(event: Event) {
    const target = event?.target as HTMLInputElement;
    this.firstName.set(target?.value);
  }

  onLastNameChange(event: Event) {
    const target = event?.target as HTMLInputElement;
    this.lastName.set(target?.value);
  }

  onPasswordChange(event: Event) {
    const target = event?.target as HTMLInputElement;
    const password = target?.value;
    this.passwordIsStrong = this.checkpasswordStrengh(password);
    this.password = password;
    console.log('passwordIsStrong: ', this.passwordIsStrong);
  }

  onEmailChange(event: Event){
    const target = event?.target as HTMLInputElement;
    this.email.set(target?.value)
  }

  checkpasswordStrengh(password: string) {
    if (!password || !this.firstName() || !this.lastName()) {
      this.passwordError = PasswordError.Empty;
      return false;
    }

    const hasUpperCase = /[A-Z]+/.test(password);

    const hasLowerCase = /[a-z]+/.test(password);

    const hasFirstName = password.includes(this.firstName());

    const hasLastName = password.includes(this.lastName());

    console.log('Still here');

    if (!hasUpperCase || !hasLowerCase) {
      this.passwordError = PasswordError.Characters;
      return false;
    }  
    
    if (hasFirstName || hasLastName) {
      this.passwordError = PasswordError.NameUsage;
      console.log('Still here');
      return false;
    }

    return true;
}

  onSubmit(): void {
    this.isLoading = true;
    const signUpDetails: SignUpDetails = {
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email()
    }

    this.signUpService.postSignUpDetails(signUpDetails).subscribe((data: SignUpDetails) => {
      setTimeout(() => {
        console.log(data);
        this.router.navigate(['confirmation']);
        this.isLoading = false;
        this
      }, 2000);
    }, err => {
      this.isLoading = false;
      console.log('this is the error: ', err)
    });
  }

}
