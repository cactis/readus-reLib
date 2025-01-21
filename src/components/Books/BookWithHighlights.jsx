import React, { useEffect, useState } from 'react';
import { randStr } from '../../libs/lib.js';
import { Html } from '../Commons/Html.jsx';
import { Main, Side } from '../Layout/Layout.jsx';
import { BookItem } from './BookItem.jsx';
import * as Styled from './BookWithHighlights.styled.jsx';

export const BookWithHighlights = (props) => {
  const id = randStr('BookWithHighlights');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._BookWithHighlights id={id} className={`${className}`} {..._props}>
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
