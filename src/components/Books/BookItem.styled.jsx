import React from 'react';
import styled from 'styled-components';
import { Ellipsis } from '../Layout';
import { _Col, _Flex } from '../Layout/Layout.styled';

export const _BookItem = styled(_Col).attrs((props) => ({
  className: 'BookItem',
}))`
  /* max-width: 200px; */
  gap: 0.2rem;
  &:hover {
  }
`;

export const _Title = styled(Ellipsis).attrs((props) => ({
  className: `Title`,
}))`
  padding-top: 0.2rem;
  font-weight: 500;
`;

export const _Author = styled(Ellipsis).attrs((props) => ({
  className: `Author`,
}))`
  font-size: 0.85rem;
  /* color: 777; */
`;
