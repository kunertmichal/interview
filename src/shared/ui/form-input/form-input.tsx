import { InputHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/misc';

const input = cva('input input-bordered w-full', {
  variants: {
    inputSize: {
      sm: 'input-sm',
      md: 'input-md',
    },
  },
  defaultVariants: {
    inputSize: 'md',
  },
});

const errorText = cva('label-text-alt text-error', {
  variants: {
    inputSize: {
      sm: 'text-xs',
      md: 'text-sm',
    },
  },
  defaultVariants: {
    inputSize: 'md',
  },
});

export interface FormInputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof input> {
  label?: string;
  errors?: string;
}

export const FormInput = ({
  label,
  type,
  placeholder,
  errors,
  inputSize,
  className,
  ...rest
}: FormInputProps) => {
  return (
    <label className="form-control w-full">
      {label && (
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={cn(input({ inputSize }), className)}
        {...rest}
      />
      {errors && (
        <div className="label">
          <span className={errorText({ inputSize })}>{errors}</span>
        </div>
      )}
    </label>
  );
};
