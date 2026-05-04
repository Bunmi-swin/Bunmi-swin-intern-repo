import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CatsList } from './CatsList';

describe('CatsList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    global.fetch = jest.fn(() =>
      new Promise(() => {
        // Never resolves to keep loading state
      }),
    );

    render(<CatsList />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Loading cats...')).toBeInTheDocument();
  });

  it('should render cats list on successful fetch', async () => {
    const mockCats = [
      { id: 1, name: 'Fluffy' },
      { id: 2, name: 'Mittens' },
      { id: 3, name: 'Whiskers' },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockCats),
      } as Response),
    );

    render(<CatsList />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('cats-list')).toBeInTheDocument();
    });

    expect(screen.getByText('Fluffy')).toBeInTheDocument();
    expect(screen.getByText('Mittens')).toBeInTheDocument();
    expect(screen.getByText('Whiskers')).toBeInTheDocument();
  });

  it('should display error message on fetch failure', async () => {
    const errorMessage = 'Network error';

    global.fetch = jest.fn(() =>
      Promise.reject(new Error(errorMessage)),
    );

    render(<CatsList />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('should handle HTTP error responses', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 404,
      } as Response),
    );

    render(<CatsList />);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });

    expect(screen.getByText(/Error:/)).toBeInTheDocument();
  });

  it('should display "No cats found" when API returns empty array', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response),
    );

    render(<CatsList />);

    await waitFor(() => {
      expect(screen.getByText('No cats found')).toBeInTheDocument();
    });
  });

  it('should call fetch with correct URL and parameters', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      } as Response),
    );

    render(<CatsList />);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/cats?limit=10');
    });

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});
