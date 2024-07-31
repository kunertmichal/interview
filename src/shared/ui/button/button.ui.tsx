import { cn } from '@/shared/utils/misc';
import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes } from 'react';

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
  children: React.ReactNode;
}

export function Button({
  children,
  variant,
  shape,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(button({ variant, shape }), className, 'btn')}
      {...props}
    >
      {children}
    </button>
  );
}
