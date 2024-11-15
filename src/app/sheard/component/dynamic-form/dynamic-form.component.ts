import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
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
    field.placeholder = prompt('Enter placeholder for this field:', label) || label; // Prompt for placeholder

    if (field.type === 'select' || field.type === 'radio' || field.type === 'checkbox') {
      const optionsString = prompt('Enter options for this field (comma separated):');
      if (optionsString) {
        field.options = optionsString.split(',').map(opt => opt.trim());
      }
    }

    const minLength = prompt('Enter minimum length (optional):');
    field.minLength = minLength ? parseInt(minLength, 10) : 0;

    const maxLength = prompt('Enter maximum length (optional):');
    field.maxLength = maxLength ? parseInt(maxLength, 10) : 0;

    this.addValidation(field);

    this.fields.push(field);
    this.form = this.formBuilderService.createFormGroup(this.fields);
    this.isDisabled = false;
  }
}


  addValidation(field: Field) {
    let validators: ValidatorFn[] = [];
    if (field.required) {
      if (field.type === 'checkbox') {
        if (field.minLength) {
          validators.push(this.minCheckboxesValidator(field.minLength));
        }
        if (field.maxLength) {
          validators.push(this.maxCheckboxesValidator(field.maxLength));
        }
        validators.push(this.atLeastOneCheckedValidator()); // ensure at least one checkbox is checked
      } else if (field.type === 'radio' || field.type === 'select') {
        validators.push(Validators.required); // Radio and Select fields must be required
      } else {
        validators.push(Validators.required); // For text, number, etc.
      }
    }

    this.formBuilderService.addValidatorsToControl(this.form, field.name, validators);
  }

  atLeastOneCheckedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormArray)) {
        return null; // if not a FormArray, return null (no validation)
      }

      const selectedCount = control.controls.filter(c => c.value === true).length;

      return selectedCount > 0 ? null : { 'atLeastOneChecked': true };
    };
  }

  minCheckboxesValidator(minLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormArray)) {
        return null; // if not a FormArray, return null (no validation)
      }

      const selectedCount = control.controls.filter(c => c.value === true).length;

      return selectedCount >= minLength ? null : { 'minCheckboxes': { required: minLength, actual: selectedCount } };
    };
  }

  maxCheckboxesValidator(maxLength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormArray)) {
        return null; // if not a FormArray, return null (no validation)
      }

      const selectedCount = control.controls.filter(c => c.value === true).length;

      return selectedCount <= maxLength ? null : { 'maxCheckboxes': { required: maxLength, actual: selectedCount } };
    };
  }

  addRadioField(label: string, name: string, options: string[], required: boolean) {
    const radioField: Field = {
      type: 'radio',
      label: label,
      name: name,
      placeholder: '',
      required: required,
      options: options,
      minLength: 0,
      maxLength: 0,
      pattern: '',
    };
    this.addField(radioField);
  }

  removeField(fieldName: string) {
    this.fields = this.fields.filter((field) => field.name !== fieldName);
    this.form = this.formBuilderService.createFormGroup(this.fields);
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
    const checkboxes = (field.options ?? []).map(() => new FormControl(false));
    return new FormArray(checkboxes);
  }
}
