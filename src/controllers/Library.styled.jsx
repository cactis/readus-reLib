/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line no-underscore-dangle
export const _Library = styled.div.attrs((props) => ({
  className: 'Library',
}))`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  color: black;
  > .Header {
  }
  > .Header,
  .Footer {
    padding: 1rem;
  }
  > .Body {
    border-top: 1px solid #aaa;
    padding: 1.5rem;
    overflow: scroll;
    .List {
      height: 100%;
    }
  }
  .Footer {
    justify-content: flex-end;
    color: #333;
    font-size: 0.8rem;
    background: #1f1f1f36;
    padding: 0.2rem 1rem;
  }
`;

export const _Logo = styled.span.attrs((props) => ({ className: `Logo` }))`
  font-size: 2rem;
  font-family: Rye;
`;
