import React, { useState, useEffect } from 'react';
import * as Styled from './BookWithHighlights.styled.jsx';
import { randStr } from '../../libs/lib.js';
import { BookItem } from './BookItem.jsx';
import { Main, Side } from '../Layout/Layout.jsx';
import { Html } from '../Commons/Html.jsx';

export const BookWithHighlights = (props) => {
  const root = React.createRef();
  const id = randStr('BookWithHighlights');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._BookWithHighlights
      id={id}
      ref={root}
      className={`${className}`}
      {..._props}
    >
      <Side>
        <BookItem data={data} />
      </Side>
      <Main>
        {data.highlights.map((item, i) => (
          <Html key={i} data={item} />
        ))}
      </Main>
    </Styled._BookWithHighlights>
  );

  return _return;
};
