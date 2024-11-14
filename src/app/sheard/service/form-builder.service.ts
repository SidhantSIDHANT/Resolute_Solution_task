// src/app/shared/service/form-builder.service.ts
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Field } from '../model/field';

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  constructor(private fb: FormBuilder) {}

  createFormGroup(fields: Field[]): FormGroup {
    const group: { [key: string]: FormControl | FormArray } = {};

    fields.forEach((field) => {
      if (field.type === 'checkbox') {
        // For checkbox, create a FormArray of FormControls
        group[field.name] = this.createCheckboxFormArray(field);
      } else {
        // For other field types, create a FormControl
        group[field.name] = new FormControl('', this.getValidators(field));
      }
    });

    return this.fb.group(group);
  }

  createCheckboxFormArray(field: Field): FormArray {
    const checkboxes = field.options.map(() => new FormControl(false));  // Default value is false (unchecked)
    return new FormArray(checkboxes);
  }

  // Add validators dynamically
  addValidatorsToControl(form: FormGroup, fieldName: string, validators: any[]) {
    const control = form.get(fieldName);
    if (control) {
      control.setValidators(validators);
      control.updateValueAndValidity();
    } else {
      console.warn(`Control for field ${fieldName} not found in form`);
    }
  }

  // Get validators based on field properties
  private getValidators(field: Field) {
    const validators : any= [];
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
    return validators;
  }
}
