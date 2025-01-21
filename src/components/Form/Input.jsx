import React, { useEffect, useState } from 'react';
import { randStr } from '../../libs';
import * as Styled from './Input.styled.jsx';

export const Input = (props) => {
  const id = randStr('Input');

  useEffect(() => {}, []);

  let { field, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._Input
      id={field || id}
      className={`${className}`}
      {..._props}
    ></Styled._Input>
  );

  return _return;
};
