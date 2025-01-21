import React, { useEffect, useState } from 'react';
import { copyToClipboard, randStr } from '../../libs/lib.js';
import { Ellipsis, Main, Side } from '../Layout/Layout.jsx';
import * as Styled from './Copy.styled.jsx';
import { Icon } from './Icon.jsx';

export const Copy = (props) => {
  const id = randStr('Copy');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const copy = (e) => {
    let { target } = props;
    let $t = $(e.target);
    let _data;
    if (!data) {
      _data = $t.parent().text() || $t.parent().parent().text();
    }
    if (target) {
      _data = $(target).val() || $(target).text();
    }
    // log(data, 'data in Copy: ')
    copyToClipboard(_data);
    stop(e);
  };
  const _return = (
    <Styled._Copy id={id} className={`${className}`} {..._props}>
      <Main>
        <Ellipsis data={data} />
      </Main>
      <Side>
        <Icon name="IoCopyOutline" onClick={copy} />
      </Side>
    </Styled._Copy>
  );

  return _return;
};
