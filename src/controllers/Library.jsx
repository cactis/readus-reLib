import React, { useState, useEffect } from 'react';
import * as Styled from './Library.styled.jsx';
import {
  Body,
  Button,
  FileInput,
  Footer,
  Header,
  List,
  Main,
  QRCode,
  Reader,
  Side,
} from '../components';
import { BiBookAdd } from 'react-icons/bi';
import { GoGear } from 'react-icons/go';
import { CiSearch } from 'react-icons/ci';
import { CiFilter } from 'react-icons/ci';

import { popup, renderComponent, runLast } from '../libs/lib.jsx';
import {
  broadcast,
  log,
  newArray,
  onMessage,
  randStr,
  sendMessage,
  stop,
} from '../libs/lib.js';

export const Library = (props) => {
  const root = React.createRef();
  const id = 'Library';
  const formId = 'file-input';
  let _data = [];

  const [keyword, setkeyword] = useState(props.keyword);

  useEffect(() => {
    loadData();

    // useEffect(() => {
    //   _data = data;
    // }, [data]);
    // window.electron.ipcRenderer.sendMessage('aaa');
    // ipcRenderer.invoke('some-name', someArgument).then((result) => {
    // ...
    // });
    // log('books in : Library#useEffect');

    onMessage('bookAdded', (book) => {
      log(book, 'book in bookAdded Library#onMessage: bookAdded ');
      // setdata([book, ...data]);
      // broadcast('prependItems', [book]);
      prependItems([book]);
      // BrowserWindow.getFocusedWindow().webContents.send('prependItems', [book]);
    });
  }, []);

  const loadData = () => {
    sendMessage('loadBooks', { keyword });
    onMessage('booksLoad', (books) => {
      log(books, 'books in Library 222: ');
      setdata(books);
      _data = books;
    });
  };

  useEffect(() => {
    loadData();
  }, [keyword]);

  // useEffect(()=> {_data = data}, [data])

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
      log(keyword, 'keyword in : ');
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
            <CiSearch />
            <input
              id="search-input"
              placeholder="Search Book Titles"
              onChange={onChange}
            />
          </Styled._Search>
          <CiFilter />
        </Main>
        {/* <List data={newArray(5)} /> */}
        <Side>
          <GoGear
            id="settings"
            onClick={(e) => {
              let token = randStr('readus-relib');
              let data = `http://192.168.31.207:3000/relib?t=${token}`;
              popup(<QRCode data={data} />);
            }}
          />
        </Side>
      </Header>
      <Body>
        <List
          toolbar={
            <Button
              onClick={(e) => {
                sendMessage('openBookChooserDialog', { a: 1 });
                // window.electron.ipcRenderer.sendMessage(
                //   'openBookChooserDialog',
                // );
              }}
            >
              <BiBookAdd />
              加入書籍
            </Button>
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
