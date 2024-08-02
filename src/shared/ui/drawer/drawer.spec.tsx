import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import { Drawer } from './drawer.ui';

describe('Drawer', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly with default props', () => {
    const { container } = render(
      <Drawer
        id="test-drawer"
        renderButton={(id) => (
          <button>
            <label htmlFor={id}>Open Drawer</label>
          </button>
        )}
      >
        <p>Drawer Content</p>
      </Drawer>
    );

    expect(screen.getByRole('button', { name: 'Open Drawer' })).toBeTruthy();
    expect(screen.getByText('Drawer Content')).toBeTruthy();
    expect(container.firstElementChild?.className).not.toContain('drawer-end');
  });

  it('applies correct classes based on variant', () => {
    const { container } = render(
      <Drawer
        id="test-drawer"
        renderButton={(id) => (
          <button>
            <label htmlFor={id}>Open Drawer</label>
          </button>
        )}
        variant="right"
      >
        <p>Drawer Content</p>
      </Drawer>
    );

    expect(container.firstElementChild?.className).toContain('drawer-end');
  });

  it('uses custom className when provided', () => {
    const { container } = render(
      <Drawer
        id="test-drawer"
        renderButton={(id) => (
          <button>
            <label htmlFor={id}>Open Drawer</label>
          </button>
        )}
        className="custom-class"
      >
        <p>Drawer Content</p>
      </Drawer>
    );

    expect(container.firstElementChild?.className).toContain('custom-class');
  });
});
