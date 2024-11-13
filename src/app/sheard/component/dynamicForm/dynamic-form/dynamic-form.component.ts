import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Field } from 'src/app/sheard/model/field';
import {
  FormBuilderService,
} from 'src/app/sheard/service/form-builder.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;
  fields: Field[] = [];
  successMessage = '';
  isDisabled : boolean = true;

  constructor(private formBuilderService: FormBuilderService) {
    this.form = this.formBuilderService.createFormGroup(this.fields);
  }

  ngOnInit(): void {}

  addField(field: Field) {
    this.fields.push(field);
    this.form = this.formBuilderService.createFormGroup(this.fields);
    this.isDisabled = false;
    console.log(this.isDisabled)
  }

  removeField(fieldName: string) {
    this.fields = this.fields.filter((field) => field.name !== fieldName);
    this.form = this.formBuilderService.createFormGroup(this.fields);
    
  }

  get formControls(){
    return this.form.controls;
  }

  addRadioField(
    label: string,
    name: string,
    options: string[],
    required: boolean
  ) {
    const radioField: Field = {
      type: 'radio',
      label,
      name,
      placeholder: '',
      required,
      options,
    };
    this.addField(radioField);
  }

  submitForm() {
    if (this.form.valid) {
      console.log('Form submitted with values:', this.form.value);
      this.successMessage = 'Form submitted successfully!';
    } else {
      this.successMessage = 'Please fill out all required fields.';
    }
  }
}
