import { ElementType, PropsWithChildren } from 'react';
import {
  FormFieldSelectData,
  FormFieldTextData,
  FormFieldInputData,
} from './models/Form';

export type FormFieldContainerProps = {
  label?: string;
  error?: any;
  helperText?: string;
};

export type BaseFieldProps = FormFieldContainerProps & {
  name: string;
  disabled?: boolean;
  value?: any;
  onChange?: (e: any) => void;
  required?: boolean;
};

export type FormInputFieldProps = BaseFieldProps & FormFieldInputData;
export type FormFieldTextProps = BaseFieldProps & FormFieldTextData;
export type FormSelectFieldProps = BaseFieldProps & FormFieldSelectData;
export type FormButtonProps = {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};
export type FormLoaderBaseProps = { loading?: boolean };

export type ComponentOverride<ComponentType, PropType = ComponentType> = {
  Component?: ElementType<ComponentType>;
  Props?: PropType;
};

export interface FormComponentOverrides {
  Input?: ComponentOverride<FormInputFieldProps>;
  TextArea?: ComponentOverride<FormFieldTextProps>;
  Select?: ComponentOverride<FormSelectFieldProps>;
  Loader?: ComponentOverride<FormLoaderBaseProps>;
  Button?: ComponentOverride<FormButtonProps>;
  SubmitButton?: ComponentOverride<FormButtonProps>;
  FieldContainer?: ComponentOverride<
    PropsWithChildren<FormFieldContainerProps>,
    FormFieldContainerProps
  >;
}

export interface OverrideFormComponents {
  Input?: ElementType<FormInputFieldProps>;
  TextArea?: ElementType<FormFieldTextProps>;
  Select?: ElementType<FormSelectFieldProps>;
  Loader?: ElementType<FormLoaderBaseProps>;
  Button?: ElementType<FormButtonProps>;
  SubmitButton?: ElementType<FormButtonProps>;
  FieldContainer?: ElementType<PropsWithChildren<FormFieldContainerProps>>;
}

export interface FormComponents {
  Input: ElementType<FormInputFieldProps>;
  TextArea: ElementType<FormFieldTextProps>;
  Select: ElementType<FormSelectFieldProps>;
  Loader: ElementType<FormLoaderBaseProps>;
  Button: ElementType<FormButtonProps>;
  SubmitButton: ElementType<FormButtonProps>;
  FieldContainer: ElementType<PropsWithChildren<FormFieldContainerProps>>;
}
