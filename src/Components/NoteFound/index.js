import React from 'react';
import styles from './error.module.scss'


export const Error = () => {
  return (
    <div className={styles.error}>
      <div>УПС! попробуй перезагрузить страницу ... 😕</div>
    </div>
  );
};
