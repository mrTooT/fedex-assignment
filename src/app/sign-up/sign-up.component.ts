import { Component, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordError } from './sign-up.model';

@Component({
  selector: 'fedex-assignment-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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

  constructor() {
    effect(() => {
      console.log(`Firstname: ${this.firstName()}`);
      console.log(`Lastname: ${this.lastName()}`);
      console.log(`password: ${this.password}`);
      if (this.firstName() !== '' || this.lastName() !== '' ) {
        this.passwordIsStrong = this.checkpasswordStrengh(this.password);
      }
    });
  }
  
  onFirstNameChange(event: any) {
    this.firstName.set(event?.target?.value)
  }

  onLastNameChange(event: any) {
    this.lastName.set(event?.target?.value)
  }

  onPasswordChange(event: any) {
    const password = event?.target?.value;
    this.passwordIsStrong = this.checkpasswordStrengh(password);
    this.password = password;
    console.log('passwordIsStrong: ', this.passwordIsStrong);
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

    // this.flightDetailsService.getFlightDetails().subscribe(data => {
    //   setTimeout(() => {
    //     const bookingCode = data.data?.flightDetails?.bookingCode;
    //     if (bookingCode === this.bookingCode.value) {
    //       this.invalidBookingNumber = false;
    //       this.navigateToFlightDetails();
    //     } else {
    //       this.invalidBookingNumber = true;
    //       this.isLoading = false;
    //     }
    //   }, TIMEOUT_DURATION);
    // });
  }

}
