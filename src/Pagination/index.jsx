import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';

export const Pagination = ({ onChangeSetPage }) => {
  return (
    <>
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => onChangeSetPage(event.selected + 1)}
        pageRangeDisplayed={5}
        pageCount={9}
        previousLabel="<"
        renderOnZeroPageCount={true}
      />
    </>
  );
};
