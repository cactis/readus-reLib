import React, { useState, useEffect } from 'react';
import * as Styled from './Library.styled.jsx';
import {
  Body,
  Button,
  FileInput,
  Footer,
  Header,
  Icon,
  List,
  Main,
  popup,
  QRCode,
  Reader,
  Settings,
  Side,
} from '../components';

import {
  getEventPos,
  onMessage,
  renderComponent,
  runLast,
  sendMessage,
} from '../libs/main_lib.js';
import {
  broadcast,
  getStorage,
  log,
  newArray,
  randStr,
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

  const [keyword, setkeyword] = useState(props.keyword);

  useEffect(() => {
    loadData();
    wsConnect();
    onMessage('bookAdded', (book) => {
      log(book, 'book in bookAdded Library#onMessage: bookAdded ');
      prependItems([book]);
    });
  }, []);

  const loadData = () => {
    runLast(() => {
      sendMessage('loadBooks', { keyword });
      onMessage('booksLoad', (books) => {
        log(books, 'books in Library 222: ');
        setdata(books);
        _data = books;
      });
    });
  };

  useEffect(() => {
    loadData();
  }, [keyword]);

  const prependItems = (items) => {
    _data = [...items, ..._data];
    setdata(_data);
  };
  const { children, className = '', ..._props } = props;
  const [data, setdata] = useState([]);

  const onChange = (e) => {
    runLast(() => {
      log(e, 'e in onChange: ');
      let keyword = $('#search-input').val();
      // log(keyword, 'keyword in : ');
      setkeyword(keyword);
    });
  };
  const _return = (
    // eslint-disable-next-line react/jsx-pascal-case
    <Styled._Library id={id} ref={root} className={`${className} `} {..._props}>
      <Header>
        <Side>
          <Styled._Logo>reLib</Styled._Logo>
        </Side>
        <Main>
          <Styled._Search>
            <Icon name="CiSearch" />
            <input
              id="search-input"
              placeholder="Search Book Titles"
              onChange={onChange}
            />
          </Styled._Search>
          <Icon name="CiFilter" />
        </Main>
        {/* <List data={newArray(5)} /> */}
        <Side>
          <Icon
            name="TbPlugConnected"
            onClick={(e) => {
              wsConnect();
            }}
          />
          <Icon
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
