import React, { useEffect, useState } from 'react';
import { randStr } from '../../libs';
import { Icon } from '../Commons';
import * as Styled from './Field.styled.jsx';
import { Input } from './Input';

export const Field = (props) => {
  const id = randStr('Field');

  useEffect(() => {}, []);

  let { type, label, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  let Component = { input: Input }[type];
  const _return = (
    <Styled._Field id={id} className={`${className}`} {..._props}>
      <Icon label={label} $if={label} />
      <Component field={props.field} {..._props} />
    </Styled._Field>
  );

  return _return;
};
