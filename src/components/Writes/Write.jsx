import React, { useEffect, useState } from 'react';
import { randStr } from '../../libs/lib.js';
import { onMessage, sendMessage } from '../../libs/window_lib.js';
import { Editor } from './Editor.jsx';
import * as Styled from './Write.styled.jsx';

export const Write = (props) => {
  const id = randStr('Write');

  useEffect(() => {}, []);

  let { book, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  log(book, 'book in write: ');

  const onSave = (data) => {
    // data.book = book;
    data.book_id = book.id;
    log(data, 'data in : ');
    sendMessage('saveNote', data);
    onMessage('noteSaved', (data) => {
      log(data, 'data in Write#onSave: ');
    });
  };
  const _return = (
    <Styled._Write id={id} className={`${className}`} {..._props}>
      <Editor onSave={onSave} />
    </Styled._Write>
  );

  return _return;
};
