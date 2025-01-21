import React, { useEffect, useState } from 'react';
import { log, randStr } from '../../libs/lib.js';
import { Body, Footer } from '../Layout/Layout.jsx';
import { Copy } from './Copy.jsx';
import * as Styled from './QRCode.styled.jsx';

let QRCodeLib = require('qrcode');

export const QRCode = (props) => {
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
    <Styled._QRCode id={id} className={`${className}`} {..._props}>
      <Body>
        <Styled._Canvas id="canvas" />
      </Body>
      <Footer>
        遠端存取網址：
        <Copy data={data} />
      </Footer>
    </Styled._QRCode>
  );

  return _return;
};
