import React, { useEffect, useState } from 'react';
import * as Styled from './Editor.styled.jsx';

export const Editor = (props) => {
  const root = React.createRef();
  const id = randStr('Editor');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._Editor id={id} ref={root} className={`${className}`} {..._props}>
      Editor
    </Styled._Editor>
  );

  return _return;
};
