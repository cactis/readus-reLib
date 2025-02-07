import React, { useEffect, useState } from 'react';
import * as Styled from './Button.styled.jsx';

export const Button = (props) => {
  const id = randStr('Button');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._Button id={id} className={`${className}`} {..._props} />
  );

  return _return;
};
