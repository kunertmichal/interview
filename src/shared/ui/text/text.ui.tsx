import { cn } from '@/shared/utils/misc';

interface TextProps<Tag> extends React.HTMLAttributes<Tag> {
  children: React.ReactNode;
}

const H1 = ({ children, className }: TextProps<HTMLHeadingElement>) => (
  <h1 className={cn('text-5xl font-semibold text-white', className)}>
    {children}
  </h1>
);

const H2 = ({ children, className }: TextProps<HTMLHeadingElement>) => (
  <h2 className={cn('text-3xl font-semibold text-white', className)}>
    {children}
  </h2>
);

const H3 = ({ children, className }: TextProps<HTMLHeadingElement>) => (
  <h3 className={cn('text-xl font-semibold text-white', className)}>
    {children}
  </h3>
);

const P = ({ children, className }: TextProps<HTMLParagraphElement>) => (
  <p className={cn('text-sm', className)}>{children}</p>
);

export { H1, H2, H3, P };
