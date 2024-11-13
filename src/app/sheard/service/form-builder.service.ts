import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface Field {
  type: string;
  label: string;
  placeholder: string;
  name: string;
  required: boolean;
  options?: string[]; // For dropdown, radio buttons, etc.
}

@Injectable({
  providedIn: 'root',
})
export class FormBuilderService {
  createFieldControl(field: Field): FormControl {
    const validators = field.required ? [Validators.required] : [];
    return new FormControl("", validators);
  }

  createFormGroup(fields: Field[]): FormGroup {
    const group = {};
    fields.forEach(field => {
      group[field.name] = this.createFieldControl(field);
    });
    return new FormGroup(group);
  }
}
