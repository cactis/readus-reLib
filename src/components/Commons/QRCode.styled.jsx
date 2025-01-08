import React from 'react';
import styled from 'styled-components';
import { _Col, _Flex } from '../Layout/Layout.styled';
export const _QRCode = styled(_Col).attrs((props) => ({
  className: 'QRCode',
}))`
  gap: 0.5rem;
`;

export const _Canvas = styled.canvas.attrs((props) => ({
  className: `Canvas`,
}))``;
