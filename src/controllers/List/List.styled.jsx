/* eslint-disable no-underscore-dangle */
import styled from 'styled-components';
export const _List = styled.div.attrs((props) => ({ className: 'List' }))`
  width: 100%;
  .Header {
    justify-content: flex-end;
    align-items: center;
    color: rgb(0, 0, 0);
    padding: 1rem 0;
    gap: 0.5rem;
    flex-flow: row;
    .Icon {
    }
    .Main {
      /* justify-content: flex-end; */
    }
    .Side {
      &.r {
        font-size: 1.5rem;
      }
      gap: 0.5rem;
      align-items: center;
    }
  }
`;

export const _ListWrapper = styled.div.attrs((props) => ({
  className: `ListWrapper`,
}))`
  gap: 1.5rem;
  display: grid;
  &:has(.BookWithHighlights) {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  ${_List}.list & {
    display: flex;
    flex-flow: column;
  }
`;

export const _ListItem = styled.div.attrs((props) => ({
  className: `ListItem`,
}))`
  position: relative;
  &.new {
    animation: fade-in 0.5s;
    animation-iteration-count: 1;
    &:before {
      content: 'New';
      position: absolute;
      z-index: 100;
      padding: 0.2rem 0.5rem;
      background: #8000bb;
      border-radius: 5px;
      font-size: 0.6rem;
      color: white;
      margin: 0.5rem;
      right: 0;
      /* font-style: italic; */
      font-weight: bold;
    }
  }
  cursor: pointer;
  &:active {
    /* transform: scale(0.98); */
  }
`;

export const _Counts = styled.span.attrs((props) => ({
  className: `Counts`,
}))`
  font-size: 0.9rem;
  color: #666;
`;
