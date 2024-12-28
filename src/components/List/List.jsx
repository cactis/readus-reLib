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

export const List = (props) => {
  const root = React.createRef();
  const id = 'List';

  useEffect(() => {}, []);

  let { toolbar, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._List id={id} ref={root} className={`${className}`} {..._props}>
      <Header>
        <Side>{toolbar}</Side>
        <Main>
          <TfiReload
            onClick={(e) => {
              setdata([]);
              setdata(window?.Library?.getBooks());
            }}
          />
          <TbLayoutList />
          <TbLayoutGrid />
        </Main>
      </Header>
      <Styled._ListWrapper>
        {data.map((item, index) => (
          <Styled._ListItem key={index}>
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
