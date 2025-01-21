import React, { useEffect, useState } from 'react';
import { randStr } from '../../libs';
import * as Styled from './Form.styled.jsx';

export const Form = (props) => {
  const id = randStr('Form');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._Form id={id} className={`${className}`} {..._props}>
      {children}
    </Styled._Form>
  );

  return _return;
};
