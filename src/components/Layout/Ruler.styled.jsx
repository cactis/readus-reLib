import styled from 'styled-components';
import { _Flex } from './Layout.styled';

export const _Ruler = styled(_Flex).attrs((props) => ({
  className: `Ruler`,
}))`
  cursor: ew-resize;
  box-shadow: -4px 1px 20px 0px #b4b4b499;
  background-color: #f8f5c9ad;
  width: 2px;
`;
