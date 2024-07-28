import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Button } from './button.ui';

describe('Button', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with primary variant', () => {
    render(<Button variant="primary">Primary</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.className).toContain('btn-primary');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.className).toContain('btn-secondary');
  });

  it('renders with success variant', () => {
    render(<Button variant="success">Success</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.className).toContain('btn-success');
  });

  it('renders with error variant', () => {
    render(<Button variant="error">Error</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.className).toContain('btn-error');
  });

  it('renders with children', () => {
    render(<Button variant="primary">Primary</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement.textContent).toBe('Primary');
  });
});
