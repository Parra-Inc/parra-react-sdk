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
  FeedbackFormTitleProps,
  FeedbackFormDescriptionProps,
} from './FormComponents';
import {
  FeedbackForm,
  FeedbackFormField,
  FeedbackFormSelectFieldData,
  FeedbackFormTextFieldData,
  FeedbackFormInputFieldData,
} from '../../lib/api/ParraAPI';

export interface FormOptions {
  showCancel?: boolean;
  onCancelClicked?: () => void;
}

export type FormSubmitHandler = (values: object) => Promise<void>;
export type FormSuccessHandler = () => void;

const Title = ({ title }: FeedbackFormTitleProps) => {
  return (
    <h1 className="title" style={{ marginTop: 0, marginBottom: 8 }}>
      {title}
    </h1>
  );
};

const Description = ({ description }: FeedbackFormDescriptionProps) => {
  return (
    <p className="description" style={{ marginTop: 8 }}>
      {description}
    </p>
  );
};

const FormFieldContainer: React.FC<
  PropsWithChildren<FormFieldContainerProps>
> = ({ children, error, helperText, label, hideError, hideHelperText }) => {
  return (
    <div className="form-field-container" style={{ marginTop: 14 }}>
      {label && <div className="label">{label}</div>}

      {children}

      {!hideError && error && (
        <div
          className="error"
          style={{ marginTop: 4, color: 'red', fontSize: '0.8em' }}
        >
          {error}
        </div>
      )}
      {!error && !hideHelperText && helperText && (
        <div className="helper" style={{ marginTop: 4, fontSize: '0.8em' }}>
          {helperText}
        </div>
      )}
    </div>
  );
};

const defaultComponents: FormComponents = {
  Title: Title,
  Description: Description,
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
  form: string | FeedbackForm;
  submit: FormSubmitHandler;
  success: FormSuccessHandler;
  Components: FormComponentOverrides;
  options?: FormOptions;
  preview?: boolean;
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
  field: FeedbackFormField;
  form: FeedbackForm;
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
        field={field}
        key={field.name}
        name={field.name}
        disabled={disabled}
        value={value}
        error={error}
        onChange={onChange}
        required={required}
        label={field.title}
        helperText={field.helper_text}
        {...(field.data as FeedbackFormSelectFieldData)}
      />
    );
  } else if (field.type === 'input') {
    return (
      <Components.Input
        field={field}
        key={field.name}
        name={field.name}
        disabled={disabled}
        value={value}
        error={error}
        onChange={onChange}
        required={required}
        label={field.title}
        helperText={field.helper_text}
        {...(field.data as FeedbackFormInputFieldData)}
      />
    );
  } else if (field.type === 'text') {
    return (
      <Components.TextArea
        field={field}
        key={field.name}
        name={field.name}
        disabled={disabled}
        value={value}
        error={error}
        onChange={onChange}
        required={required}
        label={field.title}
        helperText={field.helper_text}
        {...(field.data as FeedbackFormTextFieldData)}
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

    if (comp) {
      overrideComponents[key] = comp;
    }
  });

  const Components: FormComponents = {
    ...defaultComponents,
    ...(overrideComponents as any),
  };
  const { api } = useParra();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FeedbackForm>();
  const [values, setValues] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const disabled: boolean = useMemo(
    () => loading || submitting,
    [loading, submitting]
  );

  const validateForm = async (form: FeedbackForm) => {
    const newErrors = form.data.fields.reduce((acc, field) => {
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

  const handleChange = (e: any, field: FeedbackFormField) => {
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
        .then((form) => setForm(form))
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
    <form className="parra-feedback-form" onSubmit={handleSubmit}>
      <Components.Title title={form.data.title} />

      {form.data.description && (
        <Components.Description description={form.data.description} />
      )}

      <fieldset style={{ border: 'none', margin: 0, padding: 0 }}>
        {form.data.fields.map((field, index) => (
          <Components.FieldContainer
            field={field}
            key={`field-${field.name}-${index}`}
            label={field.title}
            error={errors[field.name]}
            helperText={field.helper_text}
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
          marginTop: 10,
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
