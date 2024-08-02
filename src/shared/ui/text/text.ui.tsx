import { cn } from '@/shared/utils/misc';

interface TextProps<Tag> extends React.HTMLAttributes<Tag> {
  children: React.ReactNode;
}

const H1 = ({ children }: TextProps<HTMLHeadingElement>) => (
  <h1 className="text-5xl font-semibold text-white">{children}</h1>
);

const H2 = ({ children }: TextProps<HTMLHeadingElement>) => (
  <h2 className="text-3xl font-semibold text-white">{children}</h2>
);

const H3 = ({ children }: TextProps<HTMLHeadingElement>) => (
  <h3 className="text-xl font-semibold text-white">{children}</h3>
);

const P = ({ children, className }: TextProps<HTMLParagraphElement>) => (
  <p className={cn('text-sm', className)}>{children}</p>
);

export { H1, H2, H3, P };
