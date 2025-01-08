import React from 'react';
import styled from 'styled-components';
import { _Float } from './Layout.styled';
export const _Popup = styled(_Float).attrs((props) => ({ className: 'Popup' }))`
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222121cf;
  cursor: pointer;

  &.Dropdown {
    background-color: #22212182;
    justify-content: flex-end;
    align-items: flex-start;
  }
`;
