import React, { useState, useEffect } from 'react';
import * as Styled from './Cover.styled.jsx';
import { log, randStr } from '../../libs/lib';

export const Cover = (props) => {
  const root = React.createRef();
  const id = randStr('Cover');

  useEffect(() => {}, []);
  const [src, setsrc] = useState(props.src);

  useEffect(() => {
    setsrc(props.src);
  }, [props.src]);
  // let _src = 'https://readus.org/images/1d1930c5c02182dc561e6cff/cover.jpeg';
  // _src = '../../assets/images/undefined-cover.jpg';
  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  log(src, 'src in : ');
  let _src = `file://${src}`;
  // src.indexOf('undefined') > -1
  //   ? `file:///Users/cactis/www/readus-reLib${src}`
  //   : `file://${src}`;
  const _return = (
    <Styled._Cover
      id={id}
      ref={root}
      className={`${className}`}
      {..._props}
      // style={{ backgroundImage: `url(file://${src})` }}
    >
      <img src={_src} onerror="this.style.display='none'" />
    </Styled._Cover>
  );

  return _return;
};
