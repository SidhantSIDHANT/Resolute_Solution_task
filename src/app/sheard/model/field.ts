// src/app/shared/model/field.ts
export interface Field {
  type: string;         // 'text', 'select', 'checkbox', 'radio', etc.
  label: string;        // Label for the form field (e.g., "Name", "Email")
  name: string;         // Unique identifier for the form control (e.g., "name", "email")
  placeholder?: string; // Placeholder text for input fields (optional)
  required?: boolean;   // Whether this field is required (optional)
  options: string[];   // Options for select or radio fields (optional)
  minLength?: number;   // Minimum length for the field (optional)
  maxLength?: number;   // Maximum length for the field (optional)
  pattern?: string;     // Regular expression pattern for validation (optional)
}
