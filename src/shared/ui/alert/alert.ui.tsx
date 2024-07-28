import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/misc';
import { HTMLAttributes } from 'react';

const alert = cva('alert', {
  variants: {
    variant: {
      success: 'alert-success',
      error: 'alert-error',
      warning: 'alert-warning',
      info: 'alert-info',
    },
  },
  defaultVariants: {
    variant: 'info',
  },
});

export interface AlertProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alert> {
  children: React.ReactNode;
}

export const Alert = ({
  children,
  variant,
  className,
  ...props
}: AlertProps) => {
  return (
    <div
      role="alert"
      className={cn('alert', alert({ variant }), className)}
      {...props}
    >
      <span>{children}</span>
    </div>
  );
};
