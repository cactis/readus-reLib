import React, { useState, useEffect } from 'react';
import * as Styled from './List.styled.jsx';
import { Header, Main, Side } from '../Layout/Layout.jsx';
import { BookItem } from '../Books/BookItem.jsx';
import { sendMessage } from '../../libs/window_lib.js';
import { Reader } from '../Reader.jsx';
import {
  delayed,
  isDev,
  log,
  onMessage,
  randStr,
  subscribe,
} from '../../libs/lib.js';
import { Icon } from '../Commons/Icon.jsx';

export const List = (props) => {
  const root = React.createRef();
  const id = randStr('List');
  let _data = [];

  let { onItemClick, toolbar, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  const [time, settime] = useState(props.time);

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
      <Header className={``}>
        <Side>{toolbar}</Side>
        <Main></Main>
        <Side className={`r`}>
          <Icon
            $if={isDev()}
            name="MdOutlineDeleteForever"
            onClick={(e) => {
              sendMessage('deleteAllBooks');
              stop(e);
            }}
          />
          <Icon
            name="TfiReload"
            onClick={(e) => {
              setdata([]);
              delayed(() => {
                // setdata(window?.Library?.loadBooks());
                sendMessage('loadBooks');
              }, 100);
            }}
          />
          <Styled._Counts>total: {data.length} items</Styled._Counts>
          <Icon name="TbLayoutList" />
          {/* <Icon name="TbLayoutGrid" /> */}
        </Side>
      </Header>
      <Styled._ListWrapper>
        {data.map((item, index) => (
          <Styled._ListItem
            key={`${item.sha256}-${index}`}
            className={item.new ? 'new' : ''}
          >
            <BookItem
              data={item}
              onClick={(e) => {
                onItemClick({ item, e });
              }}
            />
          </Styled._ListItem>
        ))}
      </Styled._ListWrapper>
    </Styled._List>
  );

  return _return;
};
