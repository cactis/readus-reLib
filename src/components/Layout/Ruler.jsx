import React, { useEffect, useState } from 'react';
import * as Styled from './Ruler.styled.jsx';

export const Ruler = (props) => {
  const root = React.createRef();
  const id = randStr('Ruler');

  useEffect(() => {}, []);

  let { by = 'Ruler', children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  useEffect(() => {
    setPosition(getStorage(by));
    $(jId(id)).draggable({
      axis: 'x',
      drag: (e, ui) => {
        let { offset, position } = ui;
        setPosition(offset.left);
      },
    });
  }, []);

  const setPosition = (left) => {
    if (!left) return false;
    let $t = $(jId(id));
    let $main = $t.prev();
    let $side = $t.next();
    let parentWidth = $main.parent().width();
    $main.css({
      width: left,
    });
    let sideWidth = parentWidth - left;
    // $t.css({ left: 0 });
    $side.css({
      left: left + $t.width(),
    });
    $t.css({ left });
    setStorage(by, left);
  };

  const _return = (
    <Styled._Ruler id={id} ref={root} className={`${className}`} {..._props} />
  );

  return _return;
};
