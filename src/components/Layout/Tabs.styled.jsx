import styled from 'styled-components';
import { Icon } from '../Commons';
import { _Row } from './Layout.styled';
export const _Tabs = styled(_Row).attrs((props) => ({ className: 'Tabs' }))`
  padding: 0.5rem 1rem;
  gap: 0.5rem;
`;

export const _Tab = styled(Icon).attrs((props) => ({
  className: `Tab`,
}))`
  &.current {
    background-color: #333;
    color: white;
  }
  border: 1px solid #aaa;
  border-radius: 1rem;
  padding: 0.2rem 1rem;
`;
