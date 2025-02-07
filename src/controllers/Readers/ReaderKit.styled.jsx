import styled from 'styled-components';
import { _Col } from '../../components/Layout';
export const _ReaderKit = styled(_Col).attrs((props) => ({
  className: 'ReaderKit',
}))`
  width: 100%;
  > .Header {
    padding: 0.2rem 0;
  }
  > .Body {
    flex: unset;
    flex-grow: unset;
  }
`;
