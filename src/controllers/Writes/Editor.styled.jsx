import styled from 'styled-components';
import {
  _Body,
  _Col,
  _Footer,
  _Header,
} from '../../components/Layout/Layout.styled';
export const _Editor = styled(_Col).attrs((props) => ({ className: 'Editor' }))`
  flex: 1;
`;

export const _Title = styled(_Header).attrs((props) => ({
  className: `Title`,
}))`
  padding: 1rem 0;
  .Input {
    color: #333;
    box-shadow: unset;
    text-align: center;
    background-color: unset;
    padding: 0;
    font-size: 1.5rem;
    border-bottom: 1px solid #ccc;
  }
`;

export const _Content = styled(_Body).attrs((props) => ({
  className: `Content`,
}))`
  padding: 2rem;
`;

export const _Actions = styled(_Footer).attrs((props) => ({
  className: `Footer`,
}))`
  padding: 0.5rem 1rem;
  border-top: 1px solid #ccc;
  justify-content: flex-end;
  > .Icon {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 0.2rem 1rem;
  }
`;

export const _EditorJs = styled(_Body).attrs((props) => ({
  className: `EditorJs`,
}))`
  flex: 1;
`;
