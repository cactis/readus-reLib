import styled from 'styled-components';
import { _Body, _Col, _Footer, _Header, _Side } from './Layout.styled';
export const _Window = styled(_Col).attrs((props) => ({
  className: 'Window',
}))`
  left: 50%;
  top: 50%;
  width: 0;
  height: 0;
  transition: all 0.2s ease-in-out;
  position: absolute;
  background-color: white;
  opacity: 0;
  &[size] {
    opacity: 1;
  }
  &[size='minimize'] {
    .minimize-button {
      color: #aaa;
    }
    width: 150px;
    height: 40px;
    left: 10%;
    top: 5%;
    overflow: hidden;
    border-radius: 0.5rem;
    box-shadow: 0 0 3px 1px #33333317;
    cursor: pointer;
    .Header {
      padding: 0 0.5rem;
      color: white;
      background-color: #2e2e2e;
      .Ellipsis {
        padding: 0.5rem;
      }
    }
  }

  &[size='maximize'] {
    .maximize-button {
      color: #aaa;
    }
    left: 0 !important;
    top: 0 !important;
    width: 100vw;
    height: 100vh;
  }
  > .Header,
  > .Footer {
    font-size: 0.9rem;
    background-color: #f4f4f4;
    padding: 0.4rem 0.5rem;
    color: #333;
    box-shadow: 0 0 1px 1px #dcdcdc;
  }
`;

export const _Controllers = styled(_Side).attrs((props) => ({
  className: `Controllers`,
}))`
  justify-content: center;
  align-items: center;
  .Icon {
    font-size: 0.7rem;
  }
  .close-button {
    color: red;
  }
  .minimize-button {
    color: orange;
  }
  .maximize-button {
    color: #2dc937;
  }
`;

export const _WHeader = styled(_Header).attrs((props) => ({
  className: `WHeader`,
}))``;

export const _WBody = styled(_Body).attrs((props) => ({
  className: `WBody`,
}))`
  position: relative;
  > * {
    top: 0;
    bottom: 0;
    position: absolute;
  }
  .Main {
    left: 0;
    width: 50%;
    width: 50%;
  }
  > .Main,
  > .Side {
  }
  .Ruler {
    left: 50%;
    z-index: 1000;
  }
  > .Side {
    left: calc(50% + 2px);
    right: 0;
  }
  > .Side,
  > .Main,
  > .VRuler {
    transition: opacity 0.3s ease-in-out;
  }

  ${_Window}.side-hidden & {
    > .Main {
      width: 100% !important;
      #divider {
        display: none;
      }
    }
    > .Side,
    .Ruler {
      opacity: 0;
      left: 100% !important;
      margin-right: -100%;
      right: -100% !important;
      overflow: hidden;
      /* margin-right: 0;
      box-shadow: 0 0 1px 1px #e9e9e9; */
    }
  }
`;

export const _WFooter = styled(_Footer).attrs((props) => ({
  className: `WFooter`,
}))``;
