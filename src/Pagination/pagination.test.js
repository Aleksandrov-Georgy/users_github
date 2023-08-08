import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Pagination } from './index';

describe('Pagination component', () => {
  test('should call onChangeSetPage when page is changed', () => {
    const onChangeSetPageMock = jest.fn();

    const { getByText } = render(
      <Pagination onChangeSetPage={onChangeSetPageMock} />
    );
    // eslint-disable-next-line testing-library/prefer-screen-queries
    fireEvent.click(getByText('>')); 

    expect(onChangeSetPageMock).toHaveBeenCalledWith(2);
  });
});