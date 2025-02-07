import React, { useEffect, useState } from 'react';
import * as Styled from './Ruler.styled.jsx';

export const Ruler = (props) => {
  const root = React.createRef();
  const id = randStr('Ruler');
  let $root;

  useEffect(() => {}, []);

  let { by = 'Ruler', children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  useEffect(() => {
    $root = $(jId(id));
    setPosition(getStorage(by));
    $(jId(id)).draggable({
      axis: 'x',
      drag: (e, ui) => {
        let $parent = $(e.target).parent();
        if (ui.offset.left / $parent.width() >= 0.8) return false;
        let { offset, position } = ui;
        setPosition(offset.left);
      },
    });
  }, []);

  const setPosition = (left) => {
    if (!left) return false;
    let { storeBy } = props;
    let $t = $root;
    let $main = $t.prev();
    let $side = $t.next();
    let width = $main.parent().width();
    let mainWidth = px(_.min([80, (left / width) * 100]), '%');
    $main.css({
      width: mainWidth,
    });
    $side.css({
      left: `calc(${mainWidth} + 8px)`,
    });
    runLast(() => {
      $t.css({ left: mainWidth });
      setStorage(storeBy, left);
    }, 100);
  };

  const _return = (
    <Styled._Ruler id={id} ref={root} className={`${className}`} {..._props} />
  );

  return _return;
};
