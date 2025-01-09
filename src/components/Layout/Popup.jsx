import React, { useState, useEffect } from 'react';
import * as Styled from './Popup.styled.jsx';
import { delayed, log, randStr } from '../../libs/lib.js';
import { Float } from './Layout.jsx';
import ReactDOM, { createRoot } from 'react-dom/client';

const Popup = (props) => {
  const root = React.createRef();
  const id = randStr('Popup');

  useEffect(() => {}, []);

  let { position = {}, onClose, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  const _return = (
    <Styled._Popup
      id={id}
      ref={root}
      className={`${className}`}
      style={{ ..._props }}
      onClick={(e) => {
        if ($(e.target).hasClass('Popup')) {
          let $t = $(e.target).closest('.unwrappable');
          $t.fadeOut();
          delayed(() => {
            $t.remove();
          });
          onClose && onClose();
        }
        stop(e);
      }}
      {...props}
    >
      <Float style={{ ...position }}>{children}</Float>
    </Styled._Popup>
  );

  return _return;
};

const popup = (component, props) => {
  let target = $('body').append("<span class='unwrappable'></span>").children();
  target = _.last(target);
  // log(target, 'target in : ');
  let root = createRoot(target);
  root.render(<Popup {...props}>{component}</Popup>);
};

export { Popup, popup };
