import { ElementType, PropsWithChildren } from 'react';
import {
  FeedbackFormSelectFieldData,
  FeedbackFormTextFieldData,
  FeedbackFormInputFieldData,
  FeedbackFormField,
} from '../../lib/api/ParraAPI';

export interface FeedbackFormTitleProps {
  title: string;
}

export interface FeedbackFormDescriptionProps {
  description: string;
}

export type FormFieldContainerOverridableProps = {
  hideError?: boolean;
  hideHelperText?: boolean;
};

export type FormFieldContainerProps = FormFieldContainerOverridableProps & {
  field: FeedbackFormField;
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

export type FormInputFieldProps = BaseFieldProps & FeedbackFormInputFieldData;
export type FormFieldTextProps = BaseFieldProps & FeedbackFormTextFieldData;
export type FormSelectFieldProps = BaseFieldProps & FeedbackFormSelectFieldData;
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
  Title?: ComponentOverride<FeedbackFormTitleProps>;
  Description?: ComponentOverride<FeedbackFormDescriptionProps>;
  Input?: ComponentOverride<FormInputFieldProps>;
  TextArea?: ComponentOverride<FormFieldTextProps>;
  Select?: ComponentOverride<FormSelectFieldProps>;
  Loader?: ComponentOverride<FormLoaderBaseProps>;
  Button?: ComponentOverride<FormButtonProps>;
  SubmitButton?: ComponentOverride<FormButtonProps>;
  FieldContainer?: ComponentOverride<
    PropsWithChildren<FormFieldContainerProps>,
    FormFieldContainerOverridableProps
  >;
}

export interface OverrideFormComponents {
  Title?: ElementType<FeedbackFormTitleProps>;
  Description?: ElementType<FeedbackFormDescriptionProps>;
  Input?: ElementType<FormInputFieldProps>;
  TextArea?: ElementType<FormFieldTextProps>;
  Select?: ElementType<FormSelectFieldProps>;
  Loader?: ElementType<FormLoaderBaseProps>;
  Button?: ElementType<FormButtonProps>;
  SubmitButton?: ElementType<FormButtonProps>;
  FieldContainer?: ElementType<PropsWithChildren<FormFieldContainerProps>>;
}

export interface FormComponents {
  Title: ElementType<FeedbackFormTitleProps>;
  Description: ElementType<FeedbackFormDescriptionProps>;
  Input: ElementType<FormInputFieldProps>;
  TextArea: ElementType<FormFieldTextProps>;
  Select: ElementType<FormSelectFieldProps>;
  Loader: ElementType<FormLoaderBaseProps>;
  Button: ElementType<FormButtonProps>;
  SubmitButton: ElementType<FormButtonProps>;
  FieldContainer: ElementType<PropsWithChildren<FormFieldContainerProps>>;
}
