import React, { useEffect, useState } from 'react';
import { randStr } from '../../libs/lib.js';
import * as Styled from './AnyItem.styled.jsx';
import { BookItem } from './BookItem.jsx';
import { BookWithHighlights } from './BookWithHighlights.jsx';

export const AnyItem = (props) => {
  const id = randStr('AnyItem');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  useEffect(() => {
    setdata(props.data);
  }, [props.data]);

  let Component = { BookItem, BookWithHighlights }[
    data.highlights ? 'BookWithHighlights' : 'BookItem'
  ];

  const _return = (
    <Styled._AnyItem id={id} className={`${className}`} {..._props}>
      <Component {...props} />
    </Styled._AnyItem>
  );

  return _return;
};
