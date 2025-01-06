import React from 'react';
import styled from 'styled-components';
import { _Row } from '../Layout/Layout.styled';

export const _Copy = styled(_Row).attrs((props) => ({ className: 'Copy' }))`
  gap: 0.5rem;
  width: 100%;

  .Main {
    overflow: hidden;
  }
`;
