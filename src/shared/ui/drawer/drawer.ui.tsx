import { cn } from '@/shared/utils/misc';
import { cva, VariantProps } from 'class-variance-authority';

const drawer = cva('drawer', {
  variants: {
    variant: {
      left: '', // default, no additional classes needed
      right: 'drawer-end',
    },
  },
  defaultVariants: {
    variant: 'left',
  },
});

export interface DrawerProps extends VariantProps<typeof drawer> {
  id: string;
  children: React.ReactNode;
  renderButton: (id: string) => React.ReactNode;
  className?: string;
}

export const Drawer = ({
  id,
  children,
  renderButton,
  className,
  variant,
}: DrawerProps) => {
  return (
    <div>
      <div className={cn(drawer({ variant }), className)}>
        <input id={id} type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{renderButton(id)}</div>
        <div className="drawer-side z-10">
          <label
            htmlFor={id}
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="bg-base-200 text-base-content min-h-full py-6 px-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
