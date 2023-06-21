import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordStrenghtValidator } from './form-validators/password.validator';

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
  public fedExForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('', { 
      validators: [
        Validators.required, 
        Validators.email
      ]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required, 
        Validators.minLength(8),
        
      ]
    })
  }, passwordStrenghtValidator());

  onPasswordChange(event: any) {
    // console.log(event);
    console.log('formControl: ', this.fedExForm.controls['password'])
  }

  onFirstnameChange(event: any) {
    console.log('event: ', event);
    console.log('FirstName: ', this.fedExForm.get('firstName')?.value)
  }

  canSubmit(): boolean {
    if (this.fedExForm.invalid) {
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
