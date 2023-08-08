import React from 'react';
import styles from './search.module.scss';

import { useDispatch } from 'react-redux';
import { setSearchInput } from '../../redux/slice/SearchSlice';

import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';

export const Search = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = React.useState('');

  const onChangeInput = (event) => {
    setInputText(event);
    dispatch(setSearchInput(event));
  };

  const onClickClear = () => {
    setInputText('')
    dispatch(setSearchInput(''));
  };

  return (
    <div className={styles.input}>
      <AiOutlineSearch className={styles.svg} />
      <input
        value={inputText}
        onChange={(e) => onChangeInput(e.target.value)}
        placeholder="Поиск по логину"
      />
      {inputText && <AiOutlineClose onClick={() => onClickClear()} className={styles.close} />}
    </div>
  );
};
