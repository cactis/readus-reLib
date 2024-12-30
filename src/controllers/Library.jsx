import React, { useState, useEffect } from 'react';
import * as Styled from './Library.styled.jsx';
import {
  Body,
  Button,
  FileInput,
  Footer,
  Header,
  List,
  Reader,
} from '../components';
import { BiBookAdd } from 'react-icons/bi';

import { renderComponent } from '../libs/lib.jsx';
import {
  broadcast,
  log,
  newArray,
  onMessage,
  sendMessage,
} from '../libs/lib.js';

// const { ipcRenderer } = require('electron');

// import { ipcRenderer } from 'electron';
// import { dialog } from 'electron';

// const { dialog } = require('electron');
// const fs = require('fs');
// const path = require('path');

export const Library = (props) => {
  const root = React.createRef();
  const id = 'Library';
  const formId = 'file-input';
  let _data = [];
  useEffect(() => {
    sendMessage('loadBooks');
    onMessage('booksLoad', (books) => {
      log(books, 'books in Library 222: ');
      setdata(books);
      _data = books;
    });

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

  // useEffect(()=> {_data = data}, [data])

  const prependItems = (items) => {
    _data = [...items, ..._data];
    setdata(_data);
  };
  const { children, className = '', ..._props } = props;
  const [data, setdata] = useState([]);

  const _return = (
    // eslint-disable-next-line react/jsx-pascal-case
    <Styled._Library id={id} ref={root} className={`${className} `} {..._props}>
      <Header>
        <Styled._Logo>reLib</Styled._Logo>
        {/* <List data={newArray(5)} /> */}
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
