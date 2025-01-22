import React, { useEffect, useState } from 'react';
import { Icon } from '../Commons';
import { Body, Box, Footer, Header, Tabs } from '../Layout';
import { BookmarksList } from './BookmarksList';
import { HighlightsList } from './HighlightsList';
import { NotesList } from './NotesList';
import * as Styled from './ReaderKit.styled.jsx';

export const ReaderKit = (props) => {
  const root = React.createRef();
  const id = randStr('ReaderKit');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  const [index, setindex] = useState(props.index || 0);
  let labels = ['Notes', 'Highlights', 'Bookmarks'];
  const [label, setlabel] = useState(props.label || labels[index]);

  const onTabsChanged = ({ e, index }) => {
    log([index, e], '[index, e] in : ');
    setindex(index);
    setlabel(labels[index]);
  };

  let Component = { 0: NotesList, 1: HighlightsList, 2: BookmarksList }[index];
  const _return = (
    <Styled._ReaderKit
      id={id}
      ref={root}
      className={`${className}`}
      {..._props}
    >
      <Header>
        <Tabs onChange={onTabsChanged} index={index} />
      </Header>
      <Body>
        <Box title={<Icon label={label} name="MdOutlineNotes" />}>
          <Component {...props} />
        </Box>
      </Body>
      <Footer></Footer>
    </Styled._ReaderKit>
  );

  return _return;
};
