import React, { useEffect, useState } from 'react';
import * as Styled from './HighlightsList.styled.jsx';

export const HighlightsList = (props) => {
  const root = React.createRef();
  const id = randStr('HighlightsList');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._HighlightsList
      id={id}
      ref={root}
      className={`${className}`}
      {..._props}
    >
      HighlightsList
    </Styled._HighlightsList>
  );

  return _return;
};
