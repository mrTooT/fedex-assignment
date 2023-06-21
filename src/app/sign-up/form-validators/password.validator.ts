import {FormGroup, ValidatorFn} from '@angular/forms';

export function passwordStrenghtValidator() {
    return (formGroup: FormGroup) : void | null => {
      const firstName = formGroup.get('firstName')?.value;
      const lastName = formGroup.get('lastName')?.value;
      const password = formGroup.get('password')?.value;
        console.log('Firstname:', firstName);
        console.log('lastname:', lastName);
        console.log('value:', password);
        console.log('In the validator');

        if (!password || !firstName || !lastName) {
           console.log('I have an error');
            return null;
        }

        const hasUpperCase = /[A-Z]+/.test(password);

        const hasLowerCase = /[a-z]+/.test(password);

        const hasFirstName = password.includes(firstName);

        const hasLastName = password.includes(lastName);

        const passwordValid = hasUpperCase && hasLowerCase && !hasFirstName && !hasLastName;
        
        if (!passwordValid) {
          formGroup.get('password')?.setErrors({passWordStrengh: true})
        }

        return null;
    }
}