import { Injectable } from '@angular/core';
import { FormField } from '../model/form-field';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private fields: FormField[] = [];

  constructor() { }

  getFields(): FormField[] {
    return this.fields;
  }

  addField(field: FormField): void {
    this.fields.push(field);
  }

  removeField(name: string): void {
    this.fields = this.fields.filter(field => field.name !== name);
  }

  resetFields(): void {
    this.fields = [];
  }
}
