import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, FormArray, FormControl } from '@angular/forms';
import { CustomValidators } from '../shared/custom.validators';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor(private fb: FormBuilder) { }
  formErrors = {
    'fullName': '',
    'email': '',
    'phone': '',
    'password': '',
    'passwordGroup': '',
    'confirmPassword': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 15 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'email': 'Please Enter Valid Email.',
      'emailDomain': 'Email domain must be kztech.com'
    },
    'phone': {
      'required': 'Phone is required.'
    },
    'password': {
      'required': 'Password is required.'
    },
    'confirmPassword': {
      'required': 'Confirm Password is required.',
    },
    'passwordGroup': {
      'passwordMatch': 'Confirm Password not matched with Pasword'
    }
  };

  employeeForm: FormGroup
  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(15)]],
      contactPreference: ['email'],
      email: ['', [Validators.required, Validators.email, CustomValidators.emailDomain('kz.com')]],
      phone: ['', Validators.required],
      passwordGroup: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      }, { validator: CustomValidators.passwordMatch }),
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.onLoopThorughEachFormControl(this.employeeForm);
    });

    this.employeeForm.get('contactPreference').valueChanges.subscribe((data) => {
      this.onContactPrefernceChange(data);
    });
  }

  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', Validators.required],
      experienceInYears: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }
  onLoadDataClick(): void {
    const formArray = new FormArray([
      new FormControl('Jhon', [Validators.required]),
      new FormGroup({
        city: new FormControl('Mumbai', [Validators.required])
      }),
      new FormArray([])
    ]);

    formArray.push(new FormControl('Valid', [Validators.required]));

    console.log(formArray.at(3));

    formArray.insert(1, new FormControl('Mark', [Validators.required]));
    console.log(formArray.value);

    formArray.removeAt(4);
    console.log(formArray.value);

    formArray.setControl(1, new FormGroup({
      city: new FormControl('Pune', [Validators.required])
    }));
    console.log(formArray.value);

    const control = formArray.at(1);
    console.log(control);

    formArray.controls.forEach(control => {
      if (control instanceof FormArray) {
        console.log("Control is FormArray");
      }
      if (control instanceof FormControl) {
        console.log("Control is FormControl");
      }
      if (control instanceof FormGroup) {
        console.log("Control is FormGroup");
      }
    });

  }

  onLoopThorughEachFormControl(formGroup: FormGroup = this.employeeForm): void {
    Object.keys(formGroup.controls).forEach((key: string) => {
      const abstractControl = formGroup.get(key);

      // Clear the existing validation errors
      this.formErrors[key] = '';
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        // Get all the validation messages of the form control
        // that has failed the validation
        const messages = this.validationMessages[key];
        // Find which validation has failed. For example required,
        // minlength or maxlength. Store that error message in the
        // formErrors object. The UI will bind to this object to
        // display the validation errors
        for (const errorKey in abstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      // If the control is nested form group, recursively call
      // this same method
      if (abstractControl instanceof FormGroup) {
        this.onLoopThorughEachFormControl(abstractControl);
        // If the control is a FormControl
      }

    });
  }

  onContactPrefernceChange(selectedValue: string): void {
    const phoneFormControl = this.employeeForm.get('phone');
    const emailFormControl = this.employeeForm.get('email');
    if (selectedValue === 'phone') {
      emailFormControl.clearValidators();
      phoneFormControl.setValidators(Validators.required);
    } else if (selectedValue === 'email') {
      emailFormControl.setValidators([Validators.required, Validators.email, CustomValidators.emailDomain('kz.com')]);
      phoneFormControl.clearValidators();
    }
    phoneFormControl.updateValueAndValidity();
    emailFormControl.updateValueAndValidity();
  }
  onSubmit(): void {
    console.log(this.employeeForm.value);
  }

  onDeleteClick(skillIndex: number): void {
(<FormArray>this.employeeForm.get('skills')).removeAt(skillIndex);
  }
}


