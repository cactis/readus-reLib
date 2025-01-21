import React, { useEffect, useState } from 'react';
import { randStr } from '../../libs/lib.js';
import * as Styled from './Html.styled.jsx';

export const Html = (props) => {
  const id = randStr('Html');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._Html
      id={id}
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
