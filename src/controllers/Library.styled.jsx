/* eslint-disable import/prefer-default-export */
import React from 'react';
import styled from 'styled-components';
import { _Flex } from '../components/Layout/Layout.styled';
// eslint-disable-next-line no-underscore-dangle
export const _Library = styled.div.attrs((props) => ({
  className: 'Library',
}))`
  /* background-color: #333;
  color: white; */
  color: #333;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  > .Header {
    font-size: 1.5rem;
    > * {
      justify-content: center;
      align-items: center;
    }
    .Main {
      gap: 0.5rem;
    }
    .Side {
    }
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
    /* color: #333; */
    font-size: 0.8rem;
    background: #1f1f1f36;
    padding: 0.2rem 1rem;
  }
`;

export const _Logo = styled.span.attrs((props) => ({ className: `Logo` }))`
  font-size: 2rem;
  font-family: Rye;
`;

export const _Search = styled(_Flex).attrs((props) => ({
  className: `Search`,
}))`
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  border-radius: 10px;
  border: 1px solid #aaa;
  padding: 0.5rem 1rem;
  input {
    &::placeholder {
      color: #aaa;
      /* font-size: 0.9rem; */
    }
    font-size: 1.2rem;
    color: #666;
    border: none;
    outline: none;
  }
`;
