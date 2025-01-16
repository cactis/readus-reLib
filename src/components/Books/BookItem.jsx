import React, { useState, useEffect } from 'react';
import * as Styled from './BookItem.styled.jsx';
import { log, randStr } from '../../libs/lib.js';
import { Cover } from './Cover.jsx';
import { renderComponent } from '../../libs/window_lib.js';
import { Reader } from '../Reader.jsx';

export const BookItem = (props) => {
  const root = React.createRef();
  const id = randStr('BookItem');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  // log(data, 'data in BookItem: ');
  const _return = (
    <Styled._BookItem
      id={id}
      ref={root}
      className={`${className}`}
      onClick={(e) => {
        // log(data, 'data in : ');
        // log(data.url, 'data.url in : ');
        renderComponent(<Reader url={`file://${data.url[0]}`} />);
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
