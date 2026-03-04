import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store } from '@/store/store';
import App from '@/App';

// Mock the API module
vi.mock('@/services/api', () => ({
  itemsAPI: {
    getItems: vi.fn(),
    getItemImage: vi.fn(),
  },
}));

describe('Item selection and tab preservation', () => {
  it('selects an item and preserves the Image tab when switching items', async () => {
    const { itemsAPI } = await import('@/services/api');

    const items = [
      { guid: 'g1', name: 'Item 1', path: ['a'], properties: { a: '1' } },
      { guid: 'g2', name: 'Item 2', path: ['b'], properties: { b: '2' } },
    ];

    (itemsAPI.getItems as any).mockResolvedValue(items);
    (itemsAPI.getItemImage as any).mockImplementation((g: string) => `https://via.placeholder.com/150?text=${g}`);

    const theme = createTheme({ palette: { mode: 'light', primary: { main: '#1976d2' } } });

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    );

    // wait for items to be rendered (GUIDs shown in the table)
    await waitFor(() => expect(screen.getByText('g1')).toBeInTheDocument());

    const user = userEvent.setup();

    // click the row for Item 2
    await user.click(screen.getByText('g2'));

    // verify details updated to Item 2
    await waitFor(() => expect(screen.getByRole('heading', { name: /Item 2/i })).toBeInTheDocument());

    // switch to Image tab
    const imageTab = screen.getByRole('tab', { name: /Image/i });
    await user.click(imageTab);

    // image tab should be selected
    expect(imageTab).toHaveAttribute('aria-selected', 'true');

    // click row for Item 1
    await user.click(screen.getByText('g1'));

    // details should show Item 1 and the Image tab should remain selected
    await waitFor(() => expect(screen.getByRole('heading', { name: /Item 1/i })).toBeInTheDocument());
    expect(screen.getByRole('tab', { name: /Image/i })).toHaveAttribute('aria-selected', 'true');
  });
});
