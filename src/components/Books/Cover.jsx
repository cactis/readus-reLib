import React, { useState, useEffect } from 'react';
import * as Styled from './Cover.styled.jsx';
import { isDev, log, randStr, stop } from '../../libs/lib';
import { Icon } from '../Commons/Icon.jsx';
import { sendMessage } from '../../libs/window_lib.js';

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
  const [data, setdata] = useState(props.data);
  // log(src, 'src in : ');
  let _src = `file://${src}`;
  // _src = 'https://readus.org/images/2c2eb4c0c7f5a1902c937094/OEBPS/Image00000.jpg';
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
      <img
        src={_src}
        onError_={(e) => {
          $(e.target).attr(
            'src',
            'file:///Users/cactis/www/readus-reLib/assets/images/cover-not-available.jpg',
          );
        }}
      />
      <Styled._AddAgain>
        <Icon name="CiTrash" />
        <Icon
          $if={isDev()}
          label="getBookContent"
          onClick={(e) => {
            sendMessage('getBookContent', { url: data.url[0] });
            stop(e);
          }}
        />
        <Icon
          $if={data.url?.length > 1}
          label={data.url?.length}
          onClick={(e) => {
            log(data.url, 'data.url in : ');
            alert(`有${data.url.length}個重覆檔案。`);
            stop(e);
          }}
        />
        <Icon
          name="IoReload"
          onClick={(e) => {
            sendMessage('addBook', data);
            stop(e);
          }}
        />
      </Styled._AddAgain>
    </Styled._Cover>
  );

  return _return;
};
