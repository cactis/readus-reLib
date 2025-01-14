import React from 'react';
import styled from 'styled-components';
import { _Row } from '../Layout/Layout.styled';
export const _BookWithHighlights = styled(_Row).attrs((props) => ({
  className: 'BookWithHighlights',
}))`
  .Side {
    > * {
      width: 100%;
      width: 200px;
    }
  }
  .Main {
    flex: 3;
    flex-flow: column;
    .Html {
      box-shadow: 0 0 1px 1px #aaa;
      /* margin: 1rem; */
      padding: 1rem;
      margin: 0 1rem 1rem 1rem;
      border-radius: 5px;
      b {
        color: #ff6a00;
        font-weight: bold;
        line-height: 1.8;
      }
    }
  }
`;
