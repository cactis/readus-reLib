import React from 'react';
import styled from 'styled-components';
import { _Flex, ButtonCss } from '../Layout/Layout.styled';
export const _Icon = styled(_Flex).attrs((props) => ({ className: 'Icon' }))`
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0 0.5rem;
  cursor: pointer;
  /* font-size: 0.9rem; */
  &.button {
    ${ButtonCss}
  }
  &.round {
    border-radius: 50%;
    padding: 0.3rem;
  }
  &:hover {
    transform: scale(0.95);
    transition: all 0.3s ease-in-out;
  }
  &:active {
    top: 0.1rem;
  }
  > * {
    pointer-events: none;
  }
`;
