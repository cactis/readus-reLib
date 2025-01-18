import React, { useEffect, useState } from 'react';
import { randStr } from '../../libs/lib.js';
import * as Styled from './Write.styled.jsx';

export const Write = (props) => {
  const root = React.createRef();
  const id = randStr('Write');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._Write id={id} ref={root} className={`${className}`} {..._props}>
      Write
    </Styled._Write>
  );

  return _return;
};
