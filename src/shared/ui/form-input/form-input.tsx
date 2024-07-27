import { InputHTMLAttributes } from 'react';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errors?: string;
}

export const FormInput = ({
  label,
  type,
  placeholder,
  errors,
  ...rest
}: FormInputProps) => {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
        {...rest}
      />
      {errors && (
        <div className="label">
          <span className="label-text-alt text-error">{errors}</span>
        </div>
      )}
    </label>
  );
};
