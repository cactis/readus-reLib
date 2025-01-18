import React, { useEffect, useState } from 'react';
import { jId, log, randStr } from '../../libs/lib.js';
import { Icon } from '../Commons/Icon.jsx';
import { Reader } from '../Reader.jsx';
import { Ellipsis, Main, Side } from './Layout.jsx';
import * as Styled from './Window.styled.jsx';

log($, '$ in window: ');

export const Window = (props) => {
  const root = React.createRef();
  const id = randStr('Window');
  let $root;
  useEffect(() => {
    $root = $(jId(id));
    setDraggable();
    $root.attr('size', 'maximize');
  }, []);

  let { title, children, sideData, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  const side = sideData ? <Reader url={`file://${sideData.url[0]}`} /> : null;
  const _return = (
    <Styled._Window
      id={id}
      ref={root}
      className={`${className} ${sideData && 'side-visible'}`}
      {..._props}
    >
      <Styled._WHeader>
        <Styled._Controllers>
          <Icon
            name="BsCircleFill"
            className={`close-button`}
            onClick={(e) => {
              $root.attr('size', '');
              $root.closest('wrapper').fadeOut(300, function () {
                $(this).remove();
              });
            }}
          />
          <Icon
            name="BsCircleFill"
            className={`minimize-button`}
            onClick={(e) => {
              $root.attr('size', 'minimize');
            }}
          />
          <Icon
            name="BsCircleFill"
            className={`maximize-button`}
            onClick={(e) => {
              $root.attr('size', 'maximize');
            }}
          />
        </Styled._Controllers>
        <Main>
          <Ellipsis>{title}</Ellipsis>
        </Main>
        <Side>
          <Icon
            name="BsReverseLayoutSidebarReverse"
            onClick={(e) => {
              $root.toggleClass('side-visible');
            }}
          />
        </Side>
      </Styled._WHeader>
      <Styled._WBody>
        <Main>{children}</Main>
        <Side>{side}</Side>
      </Styled._WBody>

      <Styled._WFooter>Footer</Styled._WFooter>
    </Styled._Window>
  );

  const setDraggable = () => {
    $root.draggable({
      handle: $root.find('.Header'),
      start: (e, ui) => {
        setZindex();
      },
    });
  };

  const setZindex = () => {
    if (parseInt($root.css('z-index')) == window._zIndex) return false;
    window._zIndex = (window._zIndex || 10000) + 1;
    $root.css('z-index', window._zIndex);
    props.onFocus && props.onFocus();
    setDocumentTitle();
  };

  const setDocumentTitle = () => {
    let { title } = props;
    if (title) document.title = `${title} - ${gon.title}`;
  };

  return _return;
};
