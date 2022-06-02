/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useMemo } from 'react';
import { useParra } from '../../parra';
import PoweredByParra from '../brand/PoweredByParra';
import { FormComponents } from './FormComponents';
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

export interface Props {
  form: string | Form;
  submit: FormSubmitHandler;
  success: FormSuccessHandler;
  Components: FormComponents;
  options?: FormOptions;
}

const inputForField = ({
  Components,
  field,
  error,
  disabled,
  value,
  onChange,
}: {
  Components: FormComponents;
  field: FormField;
  form: Form;
  options?: FormOptions;
  error?: any;
  value?: any;
  onChange?: (e: any) => void;
  disabled?: boolean;
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
  Components,
}: Props) {
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

  const handleSubmit = (e: any) => {
    setSubmitting(true);

    e.preventDefault();

    if (!form) {
      console.error(`Form is required`);
      return;
    }

    const newErrors = form.fields.reduce((acc, field) => {
      const value = values[field.name];

      if (field.required && !value) {
        Object.assign(acc, { [field.name]: `${field.name} is required` });
      }

      return acc;
    }, {});

    const hasErrors = Object.values(newErrors).length > 0;

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    submit(values)
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
          <div key={`field-${field.name}-${index}`} style={{ marginTop: 6 }}>
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
          </div>
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
              variant="outlined"
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
          <Components.Button
            disabled={disabled}
            title="Submit"
            type="submit"
            variant="contained"
            loading={submitting}
          />
        </div>
      </div>
    </form>
  );
}
