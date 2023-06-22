import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordError, SignUpDetails } from './sign-up.model';
import { SignUpService } from '../services/sign-up.service';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
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
  public email = '';
  public password = '';
  public passwordIsStrong = true;
  public passwordError: PasswordError | null = null;

  constructor(
    private signUpService: SignUpService, 
    private router: Router) {
    
    // Angular Effect magic. When either signal updates this Effect will be called  
    effect(() => {
      if (this.firstName() !== '' || this.lastName() !== '' ) {
        this.passwordIsStrong = this.checkpasswordStrengh(this.password);
      }
    });
  }
  
  onFirstNameChange(event: Event): void {
    const target = event?.target as HTMLInputElement;
    this.firstName.set(target?.value);
  }

  onLastNameChange(event: Event): void {
    const target = event?.target as HTMLInputElement;
    this.lastName.set(target?.value);
  }

  onPasswordChange(event: Event): void {
    const target = event?.target as HTMLInputElement;
    const password = target?.value;
    this.passwordIsStrong = this.checkpasswordStrengh(password);
    this.password = password;
  }

  onEmailChange(event: Event): void {
    const target = event?.target as HTMLInputElement;
    this.email = target?.value;
  }

  onSubmit(): void {
    this.isLoading = true;
    const signUpDetails: SignUpDetails = {
      firstName: this.firstName(),
      lastName: this.lastName(),
      email: this.email
    }

    this.signUpService.postSignUpDetails(signUpDetails).subscribe({
      next: this.handleSignUpResponse.bind(this),
      error: this.handleError.bind(this)
    });
  }

  private checkpasswordStrengh(password: string): boolean {
    if (!password || !this.firstName() || !this.lastName()) {
      this.passwordError = PasswordError.Empty;
      return false;
    }

    const hasUpperCase = /[A-Z]+/.test(password);
    const hasLowerCase = /[a-z]+/.test(password);
    const hasFirstName = password.includes(this.firstName());
    const hasLastName = password.includes(this.lastName());

    if (!hasUpperCase || !hasLowerCase) {
      this.passwordError = PasswordError.Characters;
      return false;
    }  
    
    if (hasFirstName || hasLastName) {
      this.passwordError = PasswordError.NameUsage;
      return false;
    }

    return true;
  }

  private handleSignUpResponse(data: SignUpDetails): void {
    this.isLoading = false;
    console.log('this is the data from the server: ', data)
    this.router.navigate(['confirmation']);
  }

  private handleError(error: HttpErrorResponse): void {
    this.isLoading = false;
    console.error('this is the error: ', error)
  }

}
