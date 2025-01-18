import React, { useEffect, useState } from 'react';
import { randStr } from '../../libs/lib.js';
import { renderComponent } from '../../libs/window_lib.js';
import { Window } from '../Layout/Window.jsx';
import { Reader } from '../Reader.jsx';
import * as Styled from './BookItem.styled.jsx';
import { Cover } from './Cover.jsx';

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
        renderComponent(
          <Window title={`${data.author} - ${data.title}`}>
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
