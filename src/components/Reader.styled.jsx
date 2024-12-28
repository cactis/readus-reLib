import React from 'react';
import styled from 'styled-components';
import { ReaderCss } from './ReaderCss.js';

export const _Reader = styled.div.attrs((props) => ({ className: 'Reader' }))`
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  position: absolute;
  overflow: hidden;
  /* background-color: white; */

  ${ReaderCss}

  .Button {
    position: absolute;
    right: 0;
    top: 0;
    padding: 10px;
    cursor: pointer;
    background-color: white;
    z-index: 100;
    color: black;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    margin: 2rem;
    background-color: #4646467d;
    color: #fff;
  }
`;
