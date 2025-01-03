import React from 'react';
import styled from 'styled-components';
import { ReaderCss } from './ReaderCss.js';
import { _Flex, _Main } from './Layout/Layout.styled.jsx';

export const _Reader = styled(_Flex).attrs((props) => ({
  className: 'Reader',
}))`
  flex-flow: column;
  z-index: 100;
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
    margin: 1.2rem 1rem;
    background-color: #4646467d;
    color: #fff;
  }
  .Footer {
    justify-content: space-between;
    z-index: 100;
    color: #333;
    font-size: 0.8rem;
    padding: 1rem 2rem;
  }
`;

export const _TitleBar = styled(_Flex).attrs((props) => ({
  className: `TitleBar`,
}))`
  color: #888;
  flex-flow: row;
  font-size: 0.8rem;
  .Main {
    align-items: center;
    justify-content: space-between;
    > * {
      /* overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis; */
      max-width: 45vw;
    }
  }
  .Side {
    padding: 0.5rem 0 0 1rem;
    width: 5rem;
  }
  margin-bottom: 4rem;
`;

export const _MainL = styled(_Flex).attrs((props) => ({
  className: `MainL`,
}))`
  flex: 1;
`;

export const _MainR = styled(_Flex).attrs((props) => ({
  className: `MainR`,
}))`
  flex: 1;
  justify-content: flex-end;
`;

export const _FooterL = styled(_Flex).attrs((props) => ({
  className: `FooterL`,
}))`
  flex: 1;
`;

export const _FooterR = styled(_Flex).attrs((props) => ({
  className: `FooterR`,
}))`
  flex: 1;
  justify-content: flex-end;
`;
