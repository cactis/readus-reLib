import React, { useState, useEffect } from 'react';
import * as Styled from './AnyItem.styled.jsx';
import { BookItem } from './BookItem.jsx';
import { BookWithHighlights } from './BookWithHighlights.jsx';
import { log, randStr } from '../../libs/lib.js';

export const AnyItem = (props) => {
  const root = React.createRef();
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
    <Styled._AnyItem id={id} ref={root} className={`${className}`} {..._props}>
      <Component {...props} />
    </Styled._AnyItem>
  );

  return _return;
};
