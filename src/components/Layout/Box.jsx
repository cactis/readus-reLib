import React, { useEffect, useState } from 'react';
import { Icon } from '../Commons/Icon.jsx';
import * as Styled from './Box.styled.jsx';
import { Main, Side } from './Layout.jsx';

export const Box = (props) => {
  const id = randStr('Box');

  useEffect(() => {}, []);

  let { active = false, title, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const _return = (
    <Styled._Box id={id} className={`${className}`} {..._props}>
      <Styled._BHeader>
        <Main>{title}</Main>
        <Side>
          <Icon
            names={['MdKeyboardArrowRight', 'MdKeyboardArrowDown']}
            onClick={(e) => {
              $(jId(id)).toggleClass('active');
            }}
          />
        </Side>
      </Styled._BHeader>
      <Styled._BBody>{children}</Styled._BBody>
    </Styled._Box>
  );

  return _return;
};
