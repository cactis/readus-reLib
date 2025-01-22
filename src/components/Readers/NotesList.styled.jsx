import styled from 'styled-components';
import { _Body } from '../Layout';
export const _NotesList = styled(_Body).attrs((props) => ({
  className: 'NotesList',
}))`
  flex: unset;
  flex-grow: unset;
  width: 100%;
`;
