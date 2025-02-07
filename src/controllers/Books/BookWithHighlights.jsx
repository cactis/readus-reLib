import React, { useEffect, useState } from 'react';
import { Html, Main, Reader, ReaderKit, Side, Window } from '../../components';
import { renderComponent } from '../../libs/window_lib.js';
import { BookItem } from './BookItem';
import * as Styled from './BookWithHighlights.styled.jsx';

export const BookWithHighlights = (props) => {
  const id = randStr('BookWithHighlights');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._BookWithHighlights id={id} className={`${className}`} {..._props}>
      <Side>
        <BookItem data={data} />
      </Side>
      <Main>
        {data.highlights.map((item, i) => (
          <Html
            key={i}
            data={item}
            onClick={(e) => {
              renderComponent(
                <Window
                  className={``}
                  title={`${data.author} - ${data.title}`}
                  sidehidden
                  side={<ReaderKit book={data} />}
                >
                  <Reader
                    url={`file://${data.url[0]}`}
                    keyword={item.slice(10, 100)}
                  />
                </Window>,
              );
              stop(e);
            }}
          />
        ))}
      </Main>
    </Styled._BookWithHighlights>
  );

  return _return;
};
