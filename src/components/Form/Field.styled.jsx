import styled from 'styled-components';
import { _Col } from '../Layout/Layout.styled';
export const _Field = styled(_Col).attrs((props) => ({ className: 'Field' }))`
  flex: 1;
  > .Icon {
    font-size: 0.9rem;
    display: inline;
    line-height: 1.8;
    padding: 0;
    pointer-events: none;
  }
`;
