import React from 'react';
import styled from 'styled-components';
import { _Col, _Flex } from '../Layout/Layout.styled';
export const _Settings = styled(_Col).attrs((props) => ({
  className: 'Settings',
}))`
  width: 50vw;
  padding: 1rem;
  background-color: white;
  color: #333;
  gap: 0.5rem;
  border: 10px solid #cfcfcf;
  .Body {
    flex-flow: column;
  }
  .Footer {
    flex-flow: column;
  }
`;

export const _Code = styled.input.attrs((props) => ({ className: `Code` }))`
  padding: 0.5rem;
  font-size: 1rem;
`;
