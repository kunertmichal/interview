import { InputHTMLAttributes } from 'react';

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  errorMessage?: string;
}

export const FormInput = ({
  label,
  type,
  placeholder,
  errorMessage,
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
      />
      {errorMessage && (
        <div className="label">
          <span className="label-text-alt text-error">{errorMessage}</span>
        </div>
      )}
    </label>
  );
};
