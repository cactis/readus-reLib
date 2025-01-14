import React, { useState, useEffect } from 'react';
import * as Styled from './Html.styled.jsx';
import { randStr } from '../../libs/lib.js';

export const Html = (props) => {
  const root = React.createRef();
  const id = randStr('Html');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._Html
      id={id}
      ref={root}
      className={`${className}`}
      dangerouslySetInnerHTML={{
        __html: data
          .replace(/\\t/g, '')
          .replace(/\\n/g, '<br/>')
          .replace(/(<br\ ?\/?>\r*\s*\n*)+/g, '<br/>'),
      }}
      {..._props}
    ></Styled._Html>
  );

  return _return;
};
