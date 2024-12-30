import React, { useState, useEffect } from 'react';
import * as Styled from './List.styled.jsx';
import { Header, Main, Side } from '../Layout/Layout.jsx';
import { CgMenuGridR } from 'react-icons/cg';
import { TbLayoutList } from 'react-icons/tb';
import { TbLayoutGrid } from 'react-icons/tb';
import { BookItem } from '../Books/BookItem.jsx';
import { TfiReload } from 'react-icons/tfi';
import { renderComponent } from '../../libs/lib.jsx';
import { Reader } from '../Reader.jsx';
import {
  delayed,
  log,
  onMessage,
  randStr,
  sendMessage,
  subscribe,
} from '../../libs/lib.js';
// import { BrowserWindow } from 'electron';
// import { ipcMain } from 'electron';
export const List = (props) => {
  const root = React.createRef();
  const id = randStr('List');
  let _data = [];

  let { toolbar, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  const [time, settime] = useState(props.time);

  // const prependItems = (items) => {
  //   setdata([...items, ...data]);
  // };

  // useEffect(() => {
  //   subscribe(({ status, data }) => {
  //     log([status, data], '[status, data] in : ');
  //     prependItems(data);
  //   });
  // }, []);

  useEffect(() => {
    setdata(props.data);
  }, [props.data]);

  const _return = (
    <Styled._List
      id={id}
      ref={root}
      className={`${className}`}
      time={time}
      {..._props}
    >
      <Header>
        <Side>{toolbar}</Side>
        <Main>
          <TfiReload
            onClick={(e) => {
              setdata([]);
              delayed(() => {
                // setdata(window?.Library?.loadBooks());
                sendMessage('loadBooks');
                // sendMessage('loadBooks');
              }, 100);
            }}
          />
          <TbLayoutList />
          <TbLayoutGrid />
        </Main>
      </Header>
      <Styled._ListWrapper>
        {data.map((item, index) => (
          <Styled._ListItem
            key={`${item.id}-${index}`}
            className={item.new ? 'new' : ''}
          >
            <BookItem
              data={item}
              onClick={(e) => {
                // alert(item.title);
                renderComponent(<Reader url={`file://${item.url}`} />);
              }}
            />
          </Styled._ListItem>
        ))}
      </Styled._ListWrapper>
    </Styled._List>
  );

  return _return;
};
