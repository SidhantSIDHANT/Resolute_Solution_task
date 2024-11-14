import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Field } from '../../model/field';
import { FormBuilderService } from '../../service/form-builder.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  form!: FormGroup;
  fields: Field[] = [];
  successMessage = '';
  isDisabled = true;

  constructor(private formBuilderService: FormBuilderService) {}

  ngOnInit(): void {
    this.form = this.formBuilderService.createFormGroup(this.fields);
  }

  addField(field: Field) {
    const label = prompt('Enter label for this field:', field.label);
    if (label) {
      field.label = label;
      field.placeholder = label; // Use label as placeholder

      if (
        field.type === 'select' ||
        field.type === 'radio' ||
        field.type === 'checkbox'
      ) {
        const optionsString = prompt(
          'Enter options for this field (comma separated):'
        );
        if (optionsString) {
          field.options = optionsString.split(',').map((opt) => opt.trim());
        }
      }

      this.addValidation(field);

      this.fields.push(field);
      this.form = this.formBuilderService.createFormGroup(this.fields);
      this.isDisabled = false;
    }
  }

  addValidation(field: Field) {
    let validators: any = [];
    if (field.required) {
      validators.push(Validators.required);
    }
    if (field.minLength) {
      validators.push(Validators.minLength(field.minLength));
    }
    if (field.maxLength) {
      validators.push(Validators.maxLength(field.maxLength));
    }
    if (field.pattern) {
      validators.push(Validators.pattern(field.pattern));
    }

    this.formBuilderService.addValidatorsToControl(
      this.form,
      field.name,
      validators
    );
  }

  removeField(fieldName: string) {
    this.fields = this.fields.filter((field) => field.name !== fieldName);
    this.form = this.formBuilderService.createFormGroup(this.fields);
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
      minLength: 0,
      maxLength: 0,
      pattern: '',
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

  get formControls() {
    return this.form.controls;
  }

  getCheckboxFormArray(field: Field): FormArray {
    const checkboxes = (field.options ?? []).map(() => new FormControl(false)); // Default value is false (unchecked)
    return new FormArray(checkboxes);
  }
}
