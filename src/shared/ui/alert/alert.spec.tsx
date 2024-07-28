import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Alert } from './alert.ui';

describe('Alert', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders with success variant', () => {
    render(<Alert variant="success">Success message</Alert>);
    const alertElement = screen.getByRole('alert');
    expect(alertElement.className).toContain('alert-success');
  });

  it('renders with error variant', () => {
    render(<Alert variant="error">Error message</Alert>);
    const alertElement = screen.getByRole('alert');
    expect(alertElement.className).toContain('alert-error');
  });

  it('renders with warning variant', () => {
    render(<Alert variant="warning">Warning message</Alert>);
    const alertElement = screen.getByRole('alert');
    expect(alertElement.className).toContain('alert-warning');
  });

  it('renders with info variant', () => {
    render(<Alert variant="info">Info message</Alert>);
    const alertElement = screen.getByRole('alert');
    expect(alertElement.className).toContain('alert-info');
  });
});
