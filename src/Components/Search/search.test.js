import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { setSearchInput } from '../../redux/slice/SearchSlice';
import { Search } from './index';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../../redux/slice/SearchSlice', () => ({
  setSearchInput: jest.fn(),
}));

describe('Search', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  it('should dispatch setSearchInput action on input change', () => {
    render(<Search />);
    const inputElement = screen.getByPlaceholderText('Поиск по логину');
    const userInput = 'test';

    fireEvent.change(inputElement, { target: { value: userInput } });

    expect(inputElement.value).toBe(userInput);
    expect(mockDispatch).toHaveBeenCalledWith(setSearchInput(userInput));
  });  
});
