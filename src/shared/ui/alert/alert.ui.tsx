import { HTMLAttributes } from 'react';
import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/utils/misc';

const alert = cva('alert', {
  variants: {
    variant: {
      success:
        'alert-success border-2 border-success text-success bg-success/15',
      error: 'alert-error border-2 border-error text-error bg-error/15',
      warning:
        'alert-warning border-2 border-warning text-warning bg-warning/15',
      info: 'alert-info border-2 border-info text-info bg-info/15',
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
    <div role="alert" className={cn(alert({ variant }), className)} {...props}>
      <Icon />
      <span>{children}</span>
    </div>
  );
};
