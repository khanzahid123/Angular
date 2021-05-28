import { ValidationErrors, AbstractControl } from '@angular/forms';

export class CustomValidators {
    static emailDomain(domainName: string) {
        return (control: AbstractControl): ValidationErrors => {
          const email: string = control.value;
          const emailDomain = email.substring(email.lastIndexOf('@') + 1);
          if (emailDomain === '' || emailDomain.toLowerCase() === domainName.toLowerCase()) {
            return null;
          } else {
            const vaidationerrors: ValidationErrors = { 'emailDomain': true };
            return vaidationerrors;
          }
        };
      }

      static passwordMatch(control: AbstractControl): ValidationErrors {
          const passwordControl = control.get('password');
          const confirmPasswordControl = control.get('confirmPassword');
          const confirmPassword: string = confirmPasswordControl.value;
          const password: string = passwordControl.value;
          if (password === confirmPassword || confirmPasswordControl.pristine) {
            return null;
          } else {
            const vaidationerrors: ValidationErrors = { 'passwordMatch': true };
            return vaidationerrors;
          }
        }
  }