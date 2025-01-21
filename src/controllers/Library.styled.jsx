/* eslint-disable import/prefer-default-export */
import styled from 'styled-components';
import { _Flex } from '../components/Layout/Layout.styled';
// eslint-disable-next-line no-underscore-dangle
export const _Library = styled.div.attrs((props) => ({
  className: 'Library',
}))`
  color: #0c0b0b;
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  > .Header {
    font-size: 1.5rem;
    #settings {
    }
    > * {
      justify-content: center;
      align-items: center;
    }
    .Main {
      /* gap: 0.5rem; */
    }
    .Side {
      gap: 0rem;
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
  > .Footer {
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

export const _Env = styled.span.attrs((props) => ({ className: `Env` }))`
  font-size: 0.8rem;
  color: #aaa;
`;

export const _Search = styled(_Flex).attrs((props) => ({
  className: `Search`,
}))`
  .Icon {
    color: #999;
  }
  #search-by {
    color: green;
    /* font-size: 2rem; */
  }
  font-size: 1.2rem;
  justify-content: center;
  align-items: center;
  /* gap: 0.5rem; */
  border-radius: 10px;
  border: 1px solid #aaa;
  padding: 0.5rem 1rem;
  input {
    &::placeholder {
      color: #aaa;
      font-size: 0.9rem;
    }
    font-size: 1.2rem;
    color: #666;
    border: none;
    outline: none;
  }
  #reset-search,
  #count-of-dbstatus {
    font-size: 0.8rem;
  }
`;

export const _QRCode = styled.canvas.attrs((props) => ({
  className: `QRCode`,
}))`
  display: none;
  &.visible {
    display: unset;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 1000;
    box-shadow: 0 0 10000rem 100rem #000000d6;
    transform: translate(-50%, -50%);
  }
  width: 2rem;
  aspect-ratio: 1;
`;
