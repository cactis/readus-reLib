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
import { log, newArray } from '../libs/lib.js';
// import { dialog } from 'electron';

// const { dialog } = require('electron');
// const fs = require('fs');
// const path = require('path');

export const Library = (props) => {
  const root = React.createRef();
  const id = 'Library';
  const formId = 'file-input';
  useEffect(() => {}, []);

  const { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

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
                window.electron.ipcRenderer.sendMessage(
                  'openBookChooserDialog',
                );
              }}
            >
              <BiBookAdd />
              加入書籍
            </Button>
          }
          data={window.Library.getBooks()}
          // data={[]}
        />
      </Body>
      <Footer>power by Readus</Footer>
    </Styled._Library>
  );

  return _return;
};
