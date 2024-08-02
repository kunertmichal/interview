import { cn } from '@/shared/utils/misc';
import { cva, VariantProps } from 'class-variance-authority';
import React, { ButtonHTMLAttributes, forwardRef, ReactElement } from 'react';

const button = cva('button', {
  variants: {
    variant: {
      primary: 'btn-primary',
      secondary: 'btn-secondary',
      success: 'btn-success',
      error: 'btn-error',
      ghost: 'btn-ghost',
      link: 'btn-link',
    },
    size: {
      sm: 'btn-sm',
      md: 'btn-md',
    },
    shape: {
      square: 'btn-square',
      circle: 'btn-circle',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { children, variant, shape, size, className, asChild = false, ...props },
    ref
  ) => {
    const buttonClassName = cn(
      button({ variant, shape, size }),
      className,
      'btn'
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as ReactElement<any>, {
        ...props,
        className: buttonClassName,
        ref: ref as any,
      });
    }

    return (
      <button ref={ref} className={buttonClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
