import React, { useEffect, useState } from 'react';
import { randStr } from '../../libs';
import { List } from '../List';
import * as Styled from './NotesList.styled.jsx';

export const NotesList = (props) => {
  const root = React.createRef();
  const id = randStr('NotesList');

  useEffect(() => {}, []);
  log('abc', "'abc' in noteslist: ");
  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._NotesList
      id={id}
      ref={root}
      className={`${className}`}
      {..._props}
    >
      <List />
    </Styled._NotesList>
  );

  return _return;
};
