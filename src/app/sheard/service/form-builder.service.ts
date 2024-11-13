import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Field } from '../model/field';



@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  createFieldControl(field: Field): FormControl {
    const validators = field.required ? [Validators.required] : [];
    return new FormControl('', validators);
  }

  createFormGroup(fields: Field[]): FormGroup {
    const group = {};
    fields.forEach((field) => {
      group[field.name] = this.createFieldControl(field);
    });
    return new FormGroup(group);
  }
}
