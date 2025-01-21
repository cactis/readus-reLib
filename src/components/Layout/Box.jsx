import React, { useEffect, useState } from 'react';
import * as Styled from './Box.styled.jsx';

export const Box = (props) => {
  const id = randStr('Box');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._Box id={id} className={`${className}`} {..._props}>
      Box
    </Styled._Box>
  );

  return _return;
};
