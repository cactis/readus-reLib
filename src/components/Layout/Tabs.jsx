import React, { useEffect, useState } from 'react';
import * as Styled from './Tabs.styled.jsx';

export const Tabs = (props) => {
  const root = React.createRef();
  const id = randStr('Tabs');
  let $root;
  let { index = 0, children, className = '', ..._props } = props;
  useEffect(() => {
    $root = $(jId(id));
    $root.find('.Tab').eq(index).addClass('current');
  }, []);

  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._Tabs id={id} ref={root} className={`${className}`} {..._props}>
      <Tab label="筆記" {..._props} />
      <Tab label="書摘" {..._props} />
      <Tab label="頁籤" {..._props} />
    </Styled._Tabs>
  );

  return _return;
};

const Tab = (props) => {
  const tabClicked = (e) => {
    let $t = $(e.target);
    $t.parent().children().removeClass('current');
    $t.addClass('current');
    let index = $('.Tab').index(e.target);
    log(index, 'index in : ');
    props.onChange && props.onChange({ index, e });
  };
  return <Styled._Tab {...props} onClick={tabClicked} />;
};
