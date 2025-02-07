import React, { useEffect, useState } from 'react';
import { Reader, ReaderKit, Window } from '../../components';
import { renderComponent } from '../../libs/window_lib.js';
import * as Styled from './BookItem.styled.jsx';
import { Cover } from './Cover.jsx';

export const BookItem = (props) => {
  const id = randStr('BookItem');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  const _return = (
    <Styled._BookItem
      id={id}
      className={`${className}`}
      onClick={(e) => {
        renderComponent(
          <Window
            sidehidden
            className={``}
            title={`${data.author} - ${data.title}`}
            side={<ReaderKit book={data} />}
          >
            <Reader url={`file://${data.url[0]}`} />
          </Window>,
        );
        stop(e);
      }}
      {..._props}
    >
      <Cover src={data.cover} data={data} />
      <Styled._Title>{data.title}</Styled._Title>
      <Styled._Author>{data.author}</Styled._Author>
    </Styled._BookItem>
  );

  return _return;
};
