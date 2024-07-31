import { HTMLAttributes } from 'react';
import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/misc';

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

const icons = {
  success: CircleCheck,
  error: CircleAlert,
  warning: TriangleAlert,
  info: Info,
} as const;

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
  const Icon = variant ? icons[variant] : icons.info;

  return (
    <div
      role="alert"
      className={cn('alert', alert({ variant }), className)}
      {...props}
    >
      <Icon />
      <span>{children}</span>
    </div>
  );
};
