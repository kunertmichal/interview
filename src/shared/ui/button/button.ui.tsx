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
  ({ children, variant, shape, className, asChild = false, ...props }, ref) => {
    const buttonClassName = cn(button({ variant, shape }), className, 'btn');

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as ReactElement<any>, {
        ...props,
        className: cn(
          buttonClassName,
          (children.props as any).className,
          'btn'
        ),
        ref: ref as any,
      });
    }

    return (
      <button
        ref={ref}
        className={cn(button({ variant, shape }), className, 'btn')}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
