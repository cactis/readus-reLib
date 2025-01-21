import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { delayed, randStr } from '../../libs/lib.js';
import { Float } from './Layout.jsx';
import * as Styled from './Popup.styled.jsx';

const Popup = (props) => {
  const id = randStr('Popup');

  useEffect(() => {}, []);

  let { position, onClose, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  const closePopup = (e) => {
    if ($(e.target).hasClass('Popup') || $(e.target).hasClass('Icon')) {
      let $t = $(e.target).closest('.unwrappable');
      $t.fadeOut();
      delayed(() => {
        $t.remove();
      });
      onClose && onClose();
    }
    stop(e);
  };
  const _return = (
    <Styled._Popup
      id={id}
      className={`${className}`}
      style={{ ..._props }}
      onClick={closePopup}
      {...props}
    >
      {position ? <Float style={{ ...position }}>{children}</Float> : children}
      {/* <Styled._CloseButton>
        <Icon name="IoMdClose" onClick={closePopup} />
      </Styled._CloseButton> */}
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
