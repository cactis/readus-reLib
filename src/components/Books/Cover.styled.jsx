import React from 'react';
import styled from 'styled-components';
import { _Float } from '../Layout/Layout.styled';
export const _Cover = styled.div.attrs((props) => ({ className: 'Cover' }))`
  width: 100%;
  /* aspect-ratio: 9/16; */
  background-size: contain;
  background-repeat: no-repeat;

  object-fit: cover;
  width: 100%;
  background-size: cover;
  background-position: center;
  padding-top: 140%;
  // max-height: 50px;
  position: relative;
  box-shadow: 0 0 15px 0 #aaaaaa;
  border-radius: 0.5rem;
  overflow: hidden;
  &:hover {
    transform: scale(0.98);
    transition: all 0.5s ease-in-out;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const _AddAgain = styled(_Float).attrs((props) => ({
  className: `AddAgain`,
}))`
  bottom: 0;
  right: 0;
  flex-flow: row;
  width: 100%;
  background-color: #494949;
  color: white;
  padding: 0.3rem 0;
  justify-content: flex-end;
`;
