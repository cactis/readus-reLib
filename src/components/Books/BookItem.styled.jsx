import React from 'react';
import styled from 'styled-components';

export const _BookItem = styled.div.attrs((props) => ({
  className: 'BookItem',
}))``;

export const _Title = styled.div.attrs((props) => ({ className: `Title` }))`
  white-space: nowrap;
  overflow: hidden;
  line-height: 2;
  text-overflow: ellipsis;
  font-weight: 500;
`;

export const _Author = styled.div.attrs((props) => ({ className: `Author` }))`
  font-size: 0.85rem;
  color: 777;
  white-space: nowrap;
  overflow: hidden;
  line-height: 1.6;
`;
