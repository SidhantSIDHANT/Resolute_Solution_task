export interface Field {
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  required: boolean;
  options: string[];
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}
