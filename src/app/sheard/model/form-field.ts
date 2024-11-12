export interface FormField {
    type: string;
    label: string;
    placeholder?: string;
    name: string;
    value?: any;
    required?: boolean;
    options?: string[]; 
}
  