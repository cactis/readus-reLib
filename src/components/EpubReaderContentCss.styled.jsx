import { css } from 'styled-components';

export const EpubReaderCss = css`
  body {
    font-size: 130%;
    padding: 2rem !important;
    background: unset !important;
    p {
      line-height: 1.8 !important;
      /* color: black !important; */
      font-family: unset !important;
      margin: 1rem 0 !important;
    }
    img,
    image {
      max-width: 90% !important;
      height: unset !important;
      /* width: auto;
      height: auto; */
      padding: 1rem;
      background-color: white;
      box-shadow: 0 0 15px 0 #aaaaaa82;
    }
  }
`;

export const EpubReaderContentCss = css`
  body {
    line-height: 3.7;
    font-family: 'Trebuchet MS', sans-serif !important;
    color: rgb(36, 36, 36);
    /* font-weight: 400; */
    word-break: break-all;

    column-rule: 1px solid #ddd;
    height: 100vh !important;
    font-size: 1rem;
    color: red;
    table {
      border-collapse: collapse;
      margin: 25px 0;
      font-family: sans-serif;
      max-width: 100%;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);

      td {
        border: 1px solid #ddd;
      }
      tr p {
        font-size: 0.9em;
        padding: 0.5rem;
      }
      table-layout: fixed;
      td {
        width: 49%;
      }
      img {
        width: 100%;
      }
    }

    pre,
    pre * {
      color: #fff;
      padding: 0.5rem;
    }
    p {
      img:has(+ a) {
        margin-bottom: 0.5rem !important;
      }
      &:has(img + a) {
        text-align: center;
        font-size: 0.9rem;
      }
    }
  }
`;
