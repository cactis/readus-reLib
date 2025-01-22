import styled from 'styled-components';
import { _Body, _Col, _Footer, _Header } from './Layout.styled';
export const _Box = styled(_Col).attrs((props) => ({ className: 'Box' }))`
  flex: 1;

  background-color: #dbefff;
  border: 1px solid #aad9ff;
  /* max-height: 50vh; */
`;

export const _BHeader = styled(_Header).attrs((props) => ({
  className: `BHeader`,
}))`
  padding: 0.5rem;
`;

export const _BBody = styled(_Body).attrs((props) => ({
  className: `BBody`,
}))`
  display: none;
  height: 0;
  padding: 1rem;
  overflow: hidden;
  transition: height 0.5s ease-in-out;
  ${_Box}.active & {
    display: flex;
    overflow: scroll;
    height: unset;
  }
`;

export const _BFooter = styled(_Footer).attrs((props) => ({
  className: `BFooter`,
}))``;
