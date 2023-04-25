/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo, PropsWithChildren } from 'react';
import { useParra } from '../../parra';
import PoweredByParra from '../brand/PoweredByParra';
import {
  ComponentOverride,
  FormComponentOverrides,
  FormComponents,
  FormFieldContainerProps,
  OverrideFormComponents,
} from './FormComponents';
import {
  Form,
  FormField,
  FormFieldSelectData,
  FormFieldTextData,
  FormFieldInputData,
} from './models/Form';

export interface FormOptions {
  showCancel?: boolean;
  onCancelClicked?: () => void;
}

export type FormSubmitHandler = (values: object) => Promise<void>;
export type FormSuccessHandler = () => void;

const FormFieldContainer: React.FC<
  PropsWithChildren<FormFieldContainerProps>
> = ({ children, error, helperText, label }) => {
  return (
    <div className="form-field-container" style={{ marginTop: 14 }}>
      {label && <div className="label">{label}</div>}

      {children}

      {error && (
        <div
          className="error"
          style={{ marginTop: 4, color: 'red', fontSize: '0.8em' }}
        >
          {error}
        </div>
      )}
      {!error && helperText && (
        <div className="helper" style={{ marginTop: 4, fontSize: '0.8em' }}>
          {helperText}
        </div>
      )}
    </div>
  );
};

const defaultComponents: FormComponents = {
  FieldContainer: FormFieldContainer,
  Loader: ({ loading }) => {
    return loading ? <div>Loading...</div> : null;
  },
  Input: ({ name, value, onChange, disabled }) => {
    return (
      <input
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    );
  },
  TextArea: ({ name, value, onChange, disabled }) => {
    return (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    );
  },
  Select: ({ name, value, onChange, disabled, placeholder, options }) => {
    return (
      <select name={name} value={value} onChange={onChange} disabled={disabled}>
        <option key={'placeholder'} value={''}>
          {placeholder || '-- Select an option --'}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    );
  },
  Button: ({ title, onClick, disabled }) => {
    return (
      <button onClick={onClick} disabled={disabled}>
        {title}
      </button>
    );
  },
  SubmitButton: ({ title, onClick, disabled }) => {
    return (
      <button type="submit" onClick={onClick} disabled={disabled}>
        {title}
      </button>
    );
  },
};

export interface Props {
  form: string | Form;
  submit: FormSubmitHandler;
  success: FormSuccessHandler;
  Components: FormComponentOverrides;
  options?: FormOptions;
}

const inputForField = ({
  Components,
  field,
  error,
  disabled,
  value,
  onChange,
  required,
}: {
  Components: FormComponents;
  field: FormField;
  form: Form;
  options?: FormOptions;
  error?: any;
  value?: any;
  onChange?: (e: any) => void;
  disabled?: boolean;
  required?: boolean;
}) => {
  if (field.type === 'select') {
    return (
      <Components.Select
        key={field.name}
        name={field.name}
        disabled={disabled}
        value={value}
        error={error}
        onChange={onChange}
        required={required}
        {...(field.data as FormFieldSelectData)}
      />
    );
  } else if (field.type === 'input') {
    return (
      <Components.Input
        key={field.name}
        name={field.name}
        disabled={disabled}
        value={value}
        error={error}
        onChange={onChange}
        required={required}
        {...(field.data as FormFieldInputData)}
      />
    );
  } else if (field.type === 'text') {
    return (
      <Components.TextArea
        key={field.name}
        name={field.name}
        disabled={disabled}
        value={value}
        error={error}
        onChange={onChange}
        required={required}
        {...(field.data as FormFieldTextData)}
      />
    );
  } else {
    throw new Error(`Unknown field type: ${field.type}`);
  }
};

export default function ParraFormView({
  form: formProvider,
  options,
  submit,
  success,
  Components: ComponentOverrides,
}: Props) {
  const overrideComponents: { [key: string]: any } = {};

  Object.keys(ComponentOverrides).forEach(function (key) {
    const override = ComponentOverrides[
      key as keyof OverrideFormComponents
    ] as ComponentOverride<any>;
    const comp = override.Component as any;
    overrideComponents[key] = comp;
  });

  const Components: FormComponents = {
    ...defaultComponents,
    ...(overrideComponents as any),
  };
  const { api } = useParra();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<Form>();
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const disabled: boolean = useMemo(
    () => loading || submitting,
    [loading, submitting]
  );

  const validateForm = async (form: Form) => {
    const newErrors = form.fields.reduce((acc, field) => {
      const value = values[field.name];

      if (field.required && !value) {
        Object.assign(acc, { [field.name]: `${field.name} is required` });
      }

      return acc;
    }, {});

    const hasErrors = Object.values(newErrors).length > 0;

    if (hasErrors) {
      throw newErrors;
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!form) {
      console.error(`Form is required`);
      return;
    }

    setSubmitting(true);

    validateForm(form)
      .then(() => submit(values))
      .then(success)
      .catch((err) => {
        setErrors(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const handleChange = (e: any, field: FormField) => {
    setValues((v: any) => {
      return {
        ...v,
        [field.name]: e.target.value,
      };
    });
  };

  useEffect(() => {
    if (typeof formProvider === 'object') {
      setForm(formProvider);
    } else {
      setLoading(true);

      api
        .getFormById(formProvider)
        .then((form) => setForm(form as Form))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [formProvider, api]);

  if (loading) {
    return <Components.Loader loading={true} />;
  }

  if (!form) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 style={{ marginTop: 0, marginBottom: 8 }}>{form.title}</h1>

      {form.description && <p style={{ marginTop: 8 }}>{form.description}</p>}

      <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
        {form.fields.map((field, index) => (
          <Components.FieldContainer
            key={`field-${field.name}-${index}`}
            label={field.label}
            error={errors[field.name]}
            helperText={field.helperText}
          >
            {inputForField({
              Components,
              field,
              form,
              options,
              value: values[field.name],
              onChange: (e) => handleChange(e, field),
              error: errors[field.name],
              disabled,
            })}
          </Components.FieldContainer>
        ))}
      </fieldset>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        <div style={{ flex: 1 }}>
          {options?.showCancel && (
            <Components.Button
              disabled={disabled}
              title="Cancel"
              onClick={options.onCancelClicked}
            >
              Cancel
            </Components.Button>
          )}
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <PoweredByParra />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <Components.SubmitButton
            disabled={disabled}
            title="Submit"
            loading={submitting}
          />
        </div>
      </div>
    </form>
  );
}
