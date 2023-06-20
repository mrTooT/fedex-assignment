import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import { Observable, of } from 'rxjs'

export function passwordStrenghtValidator(): ValidatorFn {
    return (control:AbstractControl) : Observable<ValidationErrors | null> => {
      const firstName = control?.root?.get('firstName');
      const lastName = control?.root?.get('lastName');
        const value = control.value;
        console.log('Firstname:', firstName);
        console.log('lastname:', lastName);
        console.log('value:', value);
        console.log('In the validator');

        if (!value || !firstName || !lastName) {
           console.log('I have an error');
            return of(null);
        }

        const hasUpperCase = /[A-Z]+/.test(value);

        const hasLowerCase = /[a-z]+/.test(value);

        const hasFirstName = !value.includes(firstName);

        const hasLastName = !value.includes(lastName);

        const passwordValid = hasUpperCase && hasLowerCase && hasFirstName && hasLastName;

        return of(!passwordValid ? {passwordStrength:true}: null);
    }
}