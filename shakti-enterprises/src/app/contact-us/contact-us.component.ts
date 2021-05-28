import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactUs: FormGroup;
  contactUsFormErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'contactNumber': '',
    'gender': '',
    'address': '',
    'suggestion': ''
  };

  validationMessage = {
    'firstName': {
      'required': 'First Name is required.'
    },
    'lastName': {
      'required': 'Last Name is required.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'contactNumber': {
      'required': 'Contact Number is required.'
    },
    'gender': {
      'required': 'Gender is required.'
    },
    'address': {
      'required': 'Address is required.'
    },
    'suggestion': {
      'required': 'Please describe your request is required.'
    },
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.contactUs = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      contactNumber: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      suggestion: ['', Validators.required],
    });

    this.contactUs.valueChanges.subscribe((data)=>{
      this.validateContactUsForm(this.contactUs);
    });
  }

  onFormSubmit(): void {
    alert("Successfully submitted the Request!");
  }

  validateContactUsForm(formGroup: FormGroup = this.contactUs):void{

  }

}
