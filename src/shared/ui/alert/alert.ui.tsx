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
});

export interface AlertProps extends VariantProps<typeof alert> {
  children: React.ReactNode;
}

export const Alert = ({ children, variant }: AlertProps) => {
  return (
    <div role="alert" className={cn('alert', alert({ variant }))}>
      <span>{children}</span>
    </div>
  );
};
