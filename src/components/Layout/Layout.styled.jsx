import styled, { css } from 'styled-components';

export const _Layout = styled.div.attrs((props) => ({ className: 'Layout' }))``;

export const _Flex = styled.div.attrs((props) => ({ className: `Flex` }))`
  display: flex;
`;

export const _Col = styled(_Flex).attrs((props) => ({ className: `Flex` }))`
  flex-flow: column;
`;
export const _Row = styled(_Flex).attrs((props) => ({ className: `Flex` }))`
  flex-flow: row;
`;

export const _Header = styled(_Flex).attrs((props) => ({
  className: `Header`,
}))`
  flex-shrink: 1;
`;

export const _Body = styled(_Flex).attrs((props) => ({ className: `Body` }))`
  flex-grow: 1;
`;

export const _Side = styled(_Flex).attrs((props) => ({ className: `Side` }))``;

export const _Main = styled(_Body).attrs((props) => ({ className: `Main` }))``;

export const _Footer = styled(_Header).attrs((props) => ({
  className: `Footer`,
}))``;

export const ButtonCss = css`
  appearance: none;
  background-color: #0554c2;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
  padding: 0.4rem 0.8rem;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  gap: 0.5rem;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const _Button = styled.div.attrs((props) => ({ className: `Button` }))`
  & {
    ${ButtonCss}
  }

  &:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }

  &:hover {
    /* background-color: #2c974b; */
    opacity: 0.9;
  }

  &:focus {
    box-shadow: rgba(46, 164, 79, 0.4) 0 0 0 3px;
    outline: none;
  }

  &:disabled {
    background-color: #94d3a2;
    border-color: rgba(27, 31, 35, 0.1);
    color: rgba(255, 255, 255, 0.8);
    cursor: default;
  }

  &:active {
    transform: scale(0.9);
    box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
  }
`;

export const _FileInput = styled.input.attrs((props) => ({
  className: `Input`,
}))`
  ${_Button.componentStyle.rules}
`;

export const _Ellipsis = styled(_Flex).attrs((props) => ({
  className: `Ellipsis`,
}))`
  overflow: hidden;
  * {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
`;

export const _Float = styled.span.attrs((props) => ({ className: `Float` }))`
  position: absolute;
  display: flex;
`;
