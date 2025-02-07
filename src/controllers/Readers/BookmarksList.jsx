import React, { useEffect, useState } from 'react';
import * as Styled from './BookmarksList.styled.jsx';

export const BookmarksList = (props) => {
  const root = React.createRef();
  const id = randStr('BookmarksList');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._BookmarksList
      id={id}
      ref={root}
      className={`${className}`}
      {..._props}
    >
      BookmarksList
    </Styled._BookmarksList>
  );

  return _return;
};
