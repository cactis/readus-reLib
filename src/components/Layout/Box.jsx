import React, { useState, useEffect } from 'react';
import * as Styled from './Box.styled.jsx';

export const Box = (props) => {
  const root = React.createRef();
  const id = randStr('Box');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._Box id={id} ref={root} className={`${className}`} {..._props}>
      Box
    </Styled._Box>
  );

  return _return;
};
