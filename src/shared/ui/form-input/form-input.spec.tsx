import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { FormInput } from './form-input';

describe('FormInput', () => {
  afterEach(() => {
    cleanup();
  });
  it('renders with label', () => {
    render(<FormInput label="Username" />);
    expect(screen.getByText('Username')).toBeTruthy();
  });

  it('renders input with correct type', () => {
    render(<FormInput label="Password" type="password" />);
    expect(screen.getByLabelText('Password')).toHaveProperty(
      'type',
      'password'
    );
  });

  it('renders input with placeholder', () => {
    render(<FormInput label="Email" placeholder="Enter your email" />);
    expect(screen.getByPlaceholderText('Enter your email')).toBeTruthy();
  });

  it('displays error message when provided', () => {
    render(<FormInput label="Username" errors="Username is required" />);
    expect(screen.getByText('Username is required')).toBeTruthy();
  });

  it('does not display error message when not provided', () => {
    render(<FormInput label="Username" />);
    expect(screen.queryByText('Username is required')).toBeFalsy();
  });

  it('passes through additional props to input element', () => {
    render(<FormInput label="Username" data-testid="username-input" />);
    expect(screen.getByTestId('username-input')).toBeTruthy();
  });
});
