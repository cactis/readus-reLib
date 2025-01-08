import React, { useState, useEffect } from 'react';
import * as Styled from './Settings.styled.jsx';
import { randStr } from '../../libs/lib';
import { QRCode } from '../Commons/QRCode.jsx';
import { Body, Col, Footer, Header, Row } from '../Layout/Layout.jsx';

export const Settings = (props) => {
  const root = React.createRef();
  const id = randStr('Settings');

  useEffect(() => {}, []);

  let { token, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  let qrcode = `http://192.168.31.207:3000/relib?t=${token}`;

  const _return = (
    <Styled._Settings id={id} ref={root} className={`${className}`} {..._props}>
      <Header>設定</Header>
      <Body>
        <Styled._Code defaultValue={token} />
        <QRCode data={qrcode} />
      </Body>
      <Footer></Footer>
    </Styled._Settings>
  );

  return _return;
};
