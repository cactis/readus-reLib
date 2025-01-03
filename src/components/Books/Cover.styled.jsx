import React from 'react';
import styled from 'styled-components';
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
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
