import styled from 'styled-components';
import { _Col } from '../Layout/Layout.styled';
export const _Form = styled(_Col).attrs((props) => ({ className: 'Form' }))`
  gap: 0.5rem;
  .Button {
    margin-top: 3rem;
    max-width: 20rem;
    align-self: flex-end;
  }
`;
