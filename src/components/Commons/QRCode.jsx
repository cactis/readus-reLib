import React, { useState, useEffect } from 'react';
import * as Styled from './QRCode.styled.jsx';
import { log, randStr } from '../../libs/lib.js';
import { Body, Footer } from '../Layout/Layout.jsx';
import { Copy } from './Copy.jsx';

let QRCodeLib = require('qrcode');

export const QRCode = (props) => {
  const root = React.createRef();
  const id = randStr('QRCode');

  useEffect(() => {}, []);

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  useEffect(() => {
    geneQrcode();
  }, [props.data]);

  const geneQrcode = () => {
    QRCodeLib.toCanvas(
      document.getElementById('canvas'),
      data,
      function (error) {
        if (error) return log(error, 'error in : ');
        log('success!');
      },
    );
  };

  const _return = (
    <Styled._QRCode id={id} ref={root} className={`${className}`} {..._props}>
      <Body>
        <Styled._Canvas id="canvas" />
      </Body>
      <Footer>
        <Copy data={data} />
      </Footer>
    </Styled._QRCode>
  );

  return _return;
};
