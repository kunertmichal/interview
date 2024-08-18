import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { H1, H2, H3, P } from './text.ui';

describe('Text', () => {
  it('renders typography correctly', () => {
    render(<H1>Heading 1</H1>);
    render(<H2>Heading 2</H2>);
    render(<H3>Heading 3</H3>);
    render(<P>Paragraph</P>);

    expect(screen.getByText('Heading 1')).toBeTruthy();
    expect(screen.getByText('Heading 2')).toBeTruthy();
    expect(screen.getByText('Heading 3')).toBeTruthy();
    expect(screen.getByText('Paragraph')).toBeTruthy();
  });
});
