import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import BookForm from './BookForm';
import { getAuthors } from "@/services/author/api";
import '@testing-library/jest-dom';

// Mock the getAuthors API
jest.mock('@/services/author/api', () => ({
  getAuthors: jest.fn(),
}));

describe('BookForm', () => {
  const mockOnSubmit = jest.fn();
  const authors = [
    { id: 1, name: 'J.K. Rowling' },
    { id: 2, name: 'George R.R. Martin' },
  ];

  beforeEach(() => {
    getAuthors.mockResolvedValue(authors);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test 1: Render the form with initial data
  it('renders the form with initial data', async () => {
    const initialData = {
      title: 'The Great Gatsby',
      year: 1925,
      status: 'PUBLISHED',
      author_name: 'F. Scott Fitzgerald',
    };

    await act(async () => {
      render(<BookForm onSubmit={mockOnSubmit} initialData={initialData} />);
    });

    // Check if the form fields are populated with initial data
    expect(screen.getByLabelText('Title:')).toHaveValue(initialData.title);
    expect(screen.getByLabelText('Year:')).toHaveValue(initialData.year);
    expect(screen.getByLabelText('Status:')).toHaveValue(initialData.status);

    // Wait for the authors to load
    await waitFor(() => {
      expect(screen.getByTestId('mock-select')).toBeInTheDocument();
    });
  });

  // Test 2: Show author name input when "Create New Author" is selected
  it('shows author name input when "Create New Author" is selected', async () => {
    await act(async () => {
      render(<BookForm onSubmit={mockOnSubmit} />);
    });

    await waitFor(() => {
      expect(screen.getByTestId('mock-select')).toBeInTheDocument();
    });

    // Select "Create New Author" from the dropdown
    const dropdown = screen.getByTestId('mock-select');
    await act(async () => {
      fireEvent.change(dropdown, { target: { value: 'new' } });
    });

    // Check if the author name input is shown
    expect(screen.getByLabelText('New Author Name:')).toBeInTheDocument();
  });

});