export interface Form {
  title: string;
  description?: string | null;
  fields: FormField[];
}

export type FormFieldType = 'select' | 'input' | 'text';

export interface FormField {
  name: string;
  required?: boolean;
  type: FormFieldType;
  data: FormFieldData;
}

export type FormFieldData =
  | FormFieldSelectData
  | FormFieldTextData
  | FormFieldInputData;

export interface FormFieldSelectData {
  title: string;
  placeholder?: string;
  options: FormFieldSelectOption[];
}

export interface FormFieldSelectOption {
  title: string;
  value: string;
  is_other?: boolean;
}

export interface FormFieldTextData {
  title: string;
  placeholder?: string;
  lines?: number;
  max_lines?: number;
  max_height?: number;
  max_characters?: number;
}

export interface FormFieldInputData {
  title: string;
  placeholder?: string;
}
