import React, { useState, useEffect } from 'react';
import * as Styled from './Library.styled.jsx';
import {
  Button,
  FileInput,
  Footer,
  Header,
  Html,
  Icon,
  List,
  Main,
  Popup,
  popup,
  QRCode,
  Reader,
  Settings,
  Body,
  Side,
  Flex,
} from '../components';

import {
  getEventPos,
  onMessage,
  peerConnect,
  renderComponent,
  runLast,
  sendMessage,
} from '../libs/window_lib.js';
import {
  broadcast,
  copyToClipboard,
  env,
  getStorage,
  isDev,
  log,
  newArray,
  randStr,
  setStorage,
  stop,
  wsClose,
  wsConnect,
} from '../libs/lib.js';

export const Library = (props) => {
  const root = React.createRef();
  const id = 'Library';
  const formId = 'file-input';
  const token = getStorage('token', randStr('readus-relib'));
  let _data = [];

  const [keyword, setkeyword] = useState(
    getStorage('keyword') || props.keyword || '',
  );
  const [searchBy, setsearchBy] = useState(getStorage('search-by') || 'title');
  const [counts, setcounts] = useState(props.counts);
  useEffect(() => {
    loadData();
    wsConnect();
    // peerConnect();
    onMessage('bookAdded', (book) => {
      // log(book, 'book in bookAdded Library#onMessage: bookAdded ');
      prependItems([book]);
    });
    onMessage('bookDeleted', (book) => {
      log(book, 'book in : bookDeleted');
      deleteItem(book);
    });
    onMessage('booksLoaded', ({ data, countOfBooks, countOfBookFts }) => {
      // log(data, 'data in Library 222: ');
      setcounts(`${countOfBooks}/${countOfBookFts}`);
      setdata(data);
      _data = data;
    });
  }, []);

  const loadData = () => {
    setdata([]);
    runLast(() => {
      sendMessage('loadBooks', { keyword, searchBy });
    });
  };

  useEffect(() => {
    loadData();
    setStorage('search-by', searchBy);
    setStorage('keyword', keyword);
  }, [keyword, searchBy]);

  const deleteItem = (item) => {
    _data = _data.filter((_item, i) => _item.id != item.id);
    setdata(_data);
  };
  const prependItems = (items) => {
    _data = [...items, ..._data];
    setdata(_data);
  };
  const { children, className = '', ..._props } = props;
  const [data, setdata] = useState([]);
  const toggleSearchBy = (e) => {
    setsearchBy(searchBy == 'title' ? 'content' : 'title');
  };
  const onChange = (e) => {
    runLast(() => {
      log(e, 'e in onChange: ');
      let keyword = $('#search-input').val();
      // log(keyword, 'keyword in : ');
      setkeyword(keyword);
    });
  };
  const resetSearch = (e) => {
    setkeyword('');
    $('#search-input').val('');
  };
  const _return = (
    // eslint-disable-next-line react/jsx-pascal-case
    <Styled._Library
      id={id}
      ref={root}
      className={`${className} ${env} `}
      {..._props}
    >
      <Header>
        <Side>
          <Styled._Logo>
            reLib<Styled._Env $if={isDev()}>{env}</Styled._Env>
          </Styled._Logo>
        </Side>
        <Main>
          <Styled._Search>
            <Icon
              name={searchBy == 'title' ? 'PiBooksLight' : 'RiArchiveStackLine'}
              id="search-by"
              onClick={toggleSearchBy}
            />
            <input
              id="search-input"
              defaultValue={keyword}
              placeholder={
                searchBy == 'title'
                  ? 'Search by Title and Author'
                  : 'Search by Content'
              }
              onChange={onChange}
            />
            <Icon
              // $if={keyword.length > 0}
              style={{ visibility: keyword.length > 0 ? 'unset' : 'hidden' }}
              name="IoMdClose"
              id="reset-search"
              onClick={resetSearch}
            />
            <Icon
              name="CiSearch"
              onClick={(e) => {
                setkeyword(keyword);
                loadData();
              }}
            />
            <Icon label={counts} $if={isDev()} id="count-of-dbstatus" />
          </Styled._Search>
        </Main>
        <Side>
          <Icon
            name="BsVectorPen"
            $if={isDev()}
            onClick={(e) => {
              let json = window.Library.loadBooksData();

              // log(json, 'json in : ');
              let data = `<pre>${JSON.stringify(json)}</pre>`;
              // log(data, 'data in : ');

              sendMessage('getAppPath');
              onMessage('getAppPath', (path) => {
                runLast(() => {
                  const file = `${path}/books.json`;
                  log(file, 'file in : ');
                  // copyToClipboard(file);
                  popup(
                    <Html
                      data={data}
                      style={{ width: '80%', height: '80%' }}
                    />,
                  );
                }, 100);
              });
              stop(e);
            }}
          />
          <Icon
            $if={isDev()}
            name="TbPlugConnected"
            onClick={(e) => {
              // peerConnect();
            }}
          />
          <Icon
            name="PiBooksThin"
            tip="Download Books from Gutenberg"
            onClick={(e) => {
              let link = 'https://www.gutenberg.org/';

              sendMessage('openExternal', { link });
              // require('electron').shell.openExternal(link);
            }}
          />
          <Icon
            $if={isDev()}
            name="GoGear"
            id="settings"
            onClick={(e) => {
              wsConnect({ token });
              popup(<Settings token={token} />, {
                className: 'Dropdown',
                onClose: wsClose,
                position: getEventPos(e),
              });
            }}
          />
        </Side>
      </Header>
      <Body>
        <List
          // className={!keyword || searchBy == 'title' ? 'grid' : 'list'}

          toolbar={
            <Icon
              className={`button`}
              name="BiBookAdd"
              label="Add Books"
              onClick={(e) => {
                sendMessage('openBookChooserDialog');
                // window.electron.ipcRenderer.sendMessage(
                //   'openBookChooserDialog',
                // );
              }}
            />
          }
          // data={window.Library.loadBooks()}
          data={data}
        />
      </Body>
      <Footer>power by Readus</Footer>
    </Styled._Library>
  );

  return _return;
};
