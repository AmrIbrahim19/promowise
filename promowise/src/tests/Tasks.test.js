import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Tasks from './Tasks';

// Mock tasks data for testing
const mockTasks = [
  { id: 1, taskName: 'Task 1', completed: false },
  { id: 2, taskName: 'Task 2', completed: true }
];

describe('Tasks component', () => {
  test('renders tasks correctly', () => {
    render(<Tasks tasks={mockTasks} setTasks={jest.fn()} />);

    // Check if task items are rendered
    const taskItems = screen.getAllByRole('listitem');
    expect(taskItems.length).toBe(mockTasks.length);

    // Check if task names are displayed
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();

    // Check if radio buttons are rendered and default filter is set to 'all'
    const allFilterRadio = screen.getByLabelText('All');
    expect(allFilterRadio).toBeInTheDocument();
    expect(allFilterRadio).toBeChecked();
  });

  test('handles status change correctly', () => {
    // Mock setTasks function
    const mockSetTasks = jest.fn();

    render(<Tasks tasks={mockTasks} setTasks={mockSetTasks} />);

    // Simulate clicking on checkbox to change status
    fireEvent.click(screen.getByLabelText('Task 1'));
    expect(mockSetTasks).toHaveBeenCalledWith([
      { id: 1, taskName: 'Task 1', completed: true },
      { id: 2, taskName: 'Task 2', completed: true }
    ]);

    // Simulate clicking on delete button
    fireEvent.click(screen.getByText('Delete'));
    expect(mockSetTasks).toHaveBeenCalledWith([mockTasks[1]]);
  });

});
