import styled from 'styled-components';
import { _Col, _Flex, _Footer } from '../Layout';
import { ReaderCss } from '../ReaderCss';

export const _Reader = styled(_Flex).attrs((props) => ({
  className: 'Reader',
}))`
  flex-flow: column;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  /* background-color: white; */

  ${ReaderCss}

  #close-reader {
    position: absolute;
    right: 0;
    top: 0;
    /* background-color: white; */
    z-index: 100;
    /* color: black; */
    /* border-radius: 50%; */
    margin: 1.2rem 1rem;
    font-size: 1.3rem;
    /* background-color: #4646467d; */
    color: white;
    background: #aaaaaa;
    width: 30px;
    height: 30px;
    font-weight: 500;
  }
  .Footer {
    justify-content: space-between;
    z-index: 100;
    color: #333;
    font-size: 0.8rem;
    padding: 1rem 2rem;
    gap: 1rem;
    > * {
      /* align-items: center;
      justify-content: center; */
    }
  }
`;

export const _TitleBar = styled(_Flex).attrs((props) => ({
  className: `TitleBar`,
}))`
  color: #333;
  flex-flow: row;
  font-size: 0.9rem;
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

export const _MainR = styled(_Col).attrs((props) => ({
  className: `MainR`,
}))`
  flex: 1;
  align-items: flex-end;
`;

export const _FooterL = styled(_Flex).attrs((props) => ({
  className: `FooterL`,
}))`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const _FooterM = styled(_Flex).attrs((props) => ({
  className: `FooterM`,
}))`
  flex: 1;
  #controls {
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
  }

  #controls > input[type='range'] {
    width: 100%;
    appearance: auto;
    cursor: default;
    color: red;
    padding: initial;
    border: initial;
    height: 1px;
    cursor: pointer;
  }
  gap: 1rem;
`;

export const _FooterR = styled(_Flex).attrs((props) => ({
  className: `FooterR`,
}))`
  flex: 1;
  justify-content: flex-end;
  white-space: nowrap;
`;

export const _PageSlider = styled(_Footer).attrs((props) => ({
  className: `PageSlider`,
}))`
  margin: 0rem 10% 0rem;
`;
