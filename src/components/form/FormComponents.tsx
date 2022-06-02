import { ElementType } from 'react';
import {
  FormFieldSelectData,
  FormFieldTextData,
  FormFieldInputData,
} from './models/Form';

type BaseFieldProps = {
  name: string;
  disabled?: boolean;
  value?: any;
  onChange?: (e: any) => void;
  required?: boolean;
  error?: any;
  helperText?: string;
};

export type FormInputFieldProps = BaseFieldProps & FormFieldInputData;
export type FormFieldTextProps = BaseFieldProps & FormFieldTextData;
export type FormSelectFieldProps = BaseFieldProps & FormFieldSelectData;
export type FormButtonProps = {
  title: string;
  type?: 'submit';
  variant?: 'outlined' | 'contained';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};
export type FormLoaderBaseProps = { loading?: boolean };

export interface FormComponents {
  Input: ElementType<FormInputFieldProps>;
  TextArea: ElementType<FormFieldTextProps>;
  Select: ElementType<FormSelectFieldProps>;
  Loader: ElementType<FormLoaderBaseProps>;
  Button: ElementType<FormButtonProps>;
}
