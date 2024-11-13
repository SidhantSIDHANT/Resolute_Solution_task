import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  private formFieldsSubject = new BehaviorSubject<any[]>([]);

  constructor() {}

  addField(field: any) {
    const currentFields = this.formFieldsSubject.value;
    currentFields.push(field);
    this.formFieldsSubject.next([...currentFields]); 
  }

  removeField(index: number) {
    const currentFields = this.formFieldsSubject.value;
    currentFields.splice(index, 1);
    this.formFieldsSubject.next([...currentFields]);  
  }

  getFormFields() {
    return this.formFieldsSubject.asObservable();
  }
}
