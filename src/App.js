import React from 'react';
import axios from 'axios';

import { useSelector, useDispatch } from 'react-redux';

import { setUsers, setUsersAll } from './redux/slice/SearchSlice';

import './App.css';
import S from './styles/app.module.scss';
import { AppSkeleton } from './skeleton/AppSkeleton';

import { Search } from './Components/Search';
import { Error } from './Components/NoteFound';
import { Pagination } from './Pagination';


import { AiOutlineCloseCircle } from 'react-icons/ai';

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.searchSlice.users);
  const inputSearch = useSelector((state) => state.searchSlice.searchInput);
  const usersAll = useSelector((state) => state.searchSlice.usersAll);

  const [loading, setLoading] = React.useState(false);
  const [showPopup, setShowPopup] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState(false);
  const [filterText, setFilterText] = React.useState('');
  const [infoBlockShow, setInfoBlockShow] = React.useState(false);
  const [userInfoBlock, setUserInfoBlock] = React.useState([]);

  const popup = React.useRef();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`https://api.github.com/search/users?q=Q&per_page=100`);
        dispatch(setUsersAll(res.data.items));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const fetchSearch = inputSearch ? inputSearch : 'Q';
  const [page, setPage] = React.useState(1);
  const [descFilter, setDescFilter] = React.useState(false);
  const [ascFilter, setAscFilter] = React.useState(false);

  const params = () => {
    if (descFilter || ascFilter === true) {
      return true;
    }
    return false;
  };

  const filterUser = () => {
    if (descFilter) {
      return 'desc';
    } else {
      return 'asc';
    }
  };

  const filterParams = params ? filterUser() : ' ';

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://api.github.com/search/users?q=${fetchSearch}&per_page=5&page=${page}&sort=repositories&order=${filterParams}`,
        );
        dispatch(setUsers(res.data.items));
      } catch (error) {
        console.error(error);
        setErrorMessage(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, descFilter, ascFilter]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(popup.current)) {
        setShowPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, [showPopup]); // закрытие попап по клику вне окна

  const showPopupClick = () => {
    setShowPopup(!showPopup);
  };

  const onClickInfoUser = (user) => {
    setInfoBlockShow(true);
    setUserInfoBlock(user);
  };

  console.log('userInfoBlock', userInfoBlock);

  const filterAsc = (e) => {
    setDescFilter(false);
    setAscFilter(true);
    setFilterText(e.target.innerHTML);
  };

  const filterDesc = (e) => {
    setAscFilter(false);
    setDescFilter(true);
    setFilterText(e.target.innerHTML);
  };

  return (
    <div className={S.App}>
      <div className={S.Container}>
        <h1>Список пользователей</h1>
        <Search />
        <section>
          <h4 ref={popup} onClick={() => showPopupClick()}>
            {`фильтровать репозитории по: ${filterText}`}
          </h4>
          {showPopup && (
            <div className={S.filterActive}>
              <span onClick={(e) => filterAsc(e)}>возрастанию</span>
              <br />
              <span onClick={(e) => filterDesc(e)}>убыванию</span>
            </div>
          )}
        </section>

        <div className={S.content}>
          {loading ? (
            <AppSkeleton />
          ) : inputSearch ? (
            usersAll
              .filter((obj) => {
                if (obj.login.toLowerCase().includes(inputSearch.toLowerCase())) {
                  return true;
                }
                return false;
              })
              .map((user) => (
                <div className={S.content_block} key={user.id}>
                  <img src={user.avatar_url} alt="avatar" />
                  <div className={S.content_block_users}>
                    <h4>{user.login}</h4>
                  </div>
                  <button onClick={() => onClickInfoUser(user)}>INFO</button>
                </div>
              ))
          ) : (
            users
              .filter((obj) => {
                if (obj.login.toLowerCase().includes(inputSearch.toLowerCase())) {
                  return true;
                }
                return false;
              })
              .map((user) => (
                <div className={S.content_block} key={user.id}>
                  <img src={user.avatar_url} alt="avatar" />
                  <div className={S.content_block_users}>
                    <h4>{user.login}</h4>
                  </div>
                  <button onClick={() => onClickInfoUser(user)}>INFO</button>
                </div>
              ))
          )}
          {errorMessage ? <Error /> : ''}
        </div>
        <Pagination onChangeSetPage={(number) => setPage(number)} />
      </div>
      {userInfoBlock && (
        <div className={`${S.infoBlock} ${infoBlockShow && S.active}`}>
          <div className={S.title}>
            <h1>Дополнительная информация</h1>
            <AiOutlineCloseCircle
              onClick={() => setInfoBlockShow(!infoBlockShow)}
              className={S.close_svg}
            />
          </div>
          <img alt="logo" src={userInfoBlock.avatar_url} />
          <h4>{userInfoBlock.login}</h4>
          <span>
            Посмотреть аккаунт на <a href={userInfoBlock.html_url}>GitHub</a>
          </span>
        </div>
      )}
      
    </div>
  );
}

export default App;
