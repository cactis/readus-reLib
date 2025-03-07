import { css } from 'styled-components';
export const ReaderCss = css`
  body {
    background: #4e4e4e;
    overflow: hidden;
  }

  #main {
    /* height: 500px; */
    position: absolute;
    width: 100%;
    height: 100%;
    right: 0;
    /* left: 40px; */
    /*   -webkit-transform: translate(40px, 0);
  -moz-transform: translate(40px, 0); */

    /* border-radius: 5px 0px 0px 5px; */
    border-radius: 5px;
    background-color: #fffff3 !important;
    overflow: hidden;
    -webkit-transition:
      -webkit-transform 0.4s,
      width 0.2s;
    -moz-transition:
      -webkit-transform 0.4s,
      width 0.2s;
    -ms-transition:
      -webkit-transform 0.4s,
      width 0.2s;

    -moz-box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.1);
    -ms-box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.1);
    box-shadow: inset 0 0 50px rgba(0, 0, 0, 0.1);
  }

  #titlebar {
    /* height: 8%;
    min-height: 20px;
    padding: 1rem 0;
    position: relative;
    color: #4f4f4f;
    margin-bottom: 3rem;
    opacity: 0.8;
    text-align: center; */
    z-index: 100;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    /* &:hover {
      opacity: 1;
    } */
    & a {
      cursor: pointer;
      /* width: 18px;
      height: 19px; */
      line-height: 20px;
      overflow: hidden;
      display: inline-block;
      /* opacity: 0.5; */
      padding: 4px;
      /* border-radius: 4px; */
      font-size: 1.5rem;
    }
  }

  #book-title {
    font-weight: 400;
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  #title-seperator {
    display: none;
  }

  #viewer {
    width: 80%;
    height: 75%;
    /* margin-left: 10%; */
    margin: 0 auto;
    max-width: 1250px;
    z-index: 2;
    position: relative;
    overflow: hidden;
  }

  #viewer iframe {
    border: none;
  }
  #prev,
  #next {
    z-index: 1000;
  }
  #prev {
    left: 40px;
  }

  #next {
    right: 40px;
  }

  .arrow {
    position: absolute;
    top: 50%;
    margin-top: -32px;
    font-size: 64px;
    color: #e2e2e2;
    font-family: arial, sans-serif;
    font-weight: bold;
    cursor: pointer;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .arrow:hover {
    color: #777;
  }

  .arrow:active,
  .arrow.active {
    color: #000;
  }

  #sidebar {
    background: #e8e8e8;
    position: absolute;
    /* left: -260px; */
    /* -webkit-transform: translate(-260px, 0);
  -moz-transform: translate(-260px, 0); */
    top: 0;
    min-width: 300px;
    width: 25%;
    height: 100%;
    -webkit-transition: -webkit-transform 0.5s;
    -moz-transition: -moz-transform 0.5s;
    -ms-transition: -moz-transform 0.5s;

    overflow: hidden;
  }

  #sidebar.open {
    /* left: 0; */
    /* -webkit-transform: translate(0, 0);
 -moz-transform: translate(0, 0); */
  }

  #main.closed {
    /* left: 300px; */
    -webkit-transform: translate(300px, 0);
    -moz-transform: translate(300px, 0);
    -ms-transform: translate(300px, 0);
  }

  #main.single {
    width: 75%;
  }

  #main.single #viewer {
    /* width: 60%;
  margin-left: 20%; */
  }

  #panels {
    /* background: #4e4e4e; */
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 13px 0;
    height: 14px;
  }

  #metainfo {
    display: inline-block;
    text-align: center;
    max-width: 40vw;
  }

  #panels a {
    visibility: hidden;
    width: 18px;
    height: 20px;
    overflow: hidden;
    display: inline-block;
    color: #ccc;
    margin-left: 6px;
  }

  #panels a::before {
    visibility: visible;
  }

  #panels a:hover {
    color: #aaa;
  }

  #panels a:active {
    color: #aaa;
    margin: 1px 0 -1px 6px;
  }

  #panels a.active,
  #panels a.active:hover {
    color: #aaa;
  }

  #searchBox {
    width: 165px;
    float: left;
    margin-left: 10px;
    margin-top: -1px;
    /*
  border-radius: 5px;
  background: #9b9b9b;
  float: left;
  margin-left: 5px;
  margin-top: -5px;
  padding: 3px 10px;
  color: #000;
  border: none;
  outline: none; */
  }

  input::-webkit-input-placeholder {
    color: #454545;
  }
  input:-moz-placeholder {
    color: #454545;
  }
  input:-ms-placeholder {
    color: #454545;
  }

  #divider {
    position: absolute;
    width: 1px;
    border-right: 1px #000 solid;
    height: 75%;
    z-index: 1;
    left: 50%;
    margin-left: -1px;
    top: 14%;
    opacity: 0.15;
    box-shadow: -2px 0 15px rgba(0, 0, 0, 1);
    display: none;
  }

  #divider.show {
    display: block;
  }

  #loader {
    position: absolute;
    z-index: 10;
    left: 50%;
    top: 50%;
    margin: -33px 0 0 -33px;
  }

  #tocView,
  #bookmarksView {
    overflow-x: hidden;
    overflow-y: hidden;
    min-width: 300px;
    width: 25%;
    height: 100%;
    visibility: hidden;
    -webkit-transition: visibility 0 ease 0.5s;
    -moz-transition: visibility 0 ease 0.5s;
    -ms-transition: visibility 0 ease 0.5s;
  }

  #sidebar.open #tocView,
  #sidebar.open #bookmarksView {
    overflow-y: auto;
    visibility: visible;
    -webkit-transition: visibility 0 ease 0;
    -moz-transition: visibility 0 ease 0;
    -ms-transition: visibility 0 ease 0;
  }

  #sidebar.open #tocView {
    display: block;
  }

  #tocView > ul,
  #bookmarksView > ul {
    margin-top: 15px;
    margin-bottom: 50px;
    margin-right: 1rem;
    padding-left: 20px;
    display: block;
  }

  #tocView li,
  #bookmarksView li {
    /* margin-bottom: 10px; */
    /* width: 225px; */
    font-family: Georgia, 'Times New Roman', Times, serif;
    list-style: none;
    text-transform: capitalize;
  }

  #tocView li:active,
  #tocView li.currentChapter {
    list-style: none;
  }

  .list_item a {
    color: #333;
    text-decoration: none;
    line-height: 1.8;
  }

  .list_item a.chapter {
    font-size: 1em;
  }

  .list_item a.section {
    font-size: 0.8em;
  }

  .list_item.currentChapter > a,
  .list_item a:hover {
    color: #f1f1f1;
  }

  /* #tocView li.openChapter > a, */
  .list_item a:hover {
    color: #000;
  }

  .list_item ul {
    padding-left: 10px;
    margin-top: 8px;
    margin-left: 2rem;
    display: none;
  }

  .list_item.currentChapter > ul,
  .list_item.openChapter > ul {
    display: block;
  }

  #tocView.hidden {
    display: none;
  }

  .toc_toggle {
    display: inline-block;
    width: 14px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .toc_toggle:before {
    content: '▸';
    color: #333;
    margin-right: -4px;
  }

  .currentChapter > .toc_toggle:before,
  .openChapter > .toc_toggle:before {
    content: '▾';
  }

  .view {
    width: 300px;
    height: 100%;
    display: none;
    padding-top: 50px;
    overflow-y: auto;
  }

  #searchResults {
    margin-bottom: 50px;
    padding-left: 20px;
    display: block;
  }

  #searchResults li {
    /* margin-bottom: 10px; */
    /* width: 225px; */
    font-family: Georgia, 'Times New Roman', Times, serif;
    list-style: none;
  }

  #searchResults a {
    color: #aaa;
    text-decoration: none;
  }

  #searchResults p {
    text-decoration: none;
    font-size: 12px;
    line-height: 16px;
  }

  #searchResults p .match {
    background: #ccc;
    color: #000;
  }

  #searchResults li > p {
    color: #aaa;
  }

  #searchResults li a:hover {
    color: #e2e2e2;
  }

  #searchView.shown {
    display: block;
    overflow-y: scroll;
  }

  #notes {
    padding: 0 0 0 34px;
  }

  #notes li {
    color: #eee;
    font-size: 12px;
    width: 240px;
    border-top: 1px #fff solid;
    padding-top: 6px;
    margin-bottom: 6px;
  }

  #notes li a {
    color: #fff;
    display: inline-block;
    margin-left: 6px;
  }

  #notes li a:hover {
    text-decoration: underline;
  }

  #notes li img {
    max-width: 240px;
  }

  #note-text {
    display: block;
    width: 260px;
    height: 80px;
    margin: 0 auto;
    padding: 5px;
    border-radius: 5px;
  }

  #note-text[disabled],
  #note-text[disabled='disabled'] {
    opacity: 0.5;
  }

  #note-anchor {
    margin-left: 218px;
    margin-top: 5px;
  }

  #settingsPanel {
    display: none;
  }

  #settingsPanel h3 {
    color: #f1f1f1;
    font-family: Georgia, 'Times New Roman', Times, serif;
    margin-bottom: 10px;
  }

  #settingsPanel ul {
    margin-top: 60px;
    list-style-type: none;
  }

  #settingsPanel li {
    font-size: 1em;
    color: #f1f1f1;
  }

  #settingsPanel .xsmall {
    font-size: x-small;
  }
  #settingsPanel .small {
    font-size: small;
  }
  #settingsPanel .medium {
    font-size: medium;
  }
  #settingsPanel .large {
    font-size: large;
  }
  #settingsPanel .xlarge {
    font-size: x-large;
  }

  .highlight {
    background-color: yellow;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 50%;
    width: 630px;

    height: auto;
    z-index: 2000;
    visibility: hidden;
    margin-left: -320px;
    margin-top: -160px;
  }

  .overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    visibility: hidden;
    top: 0;
    left: 0;
    z-index: 1000;
    opacity: 0;
    background: rgba(255, 255, 255, 0.8);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    transition: all 0.3s;
  }

  .md-show {
    visibility: visible;
  }

  .md-show ~ .overlay {
    opacity: 1;
    visibility: visible;
  }

  /* Content styles */
  .md-content {
    color: #fff;
    background: #6b6b6b;
    position: relative;
    border-radius: 3px;
    margin: 0 auto;
    height: 320px;
  }

  .md-content h3 {
    margin: 0;
    padding: 6px;
    text-align: center;
    font-size: 22px;
    font-weight: 300;
    opacity: 0.8;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px 3px 0 0;
  }

  .md-content > div {
    padding: 15px 40px 30px;
    margin: 0;
    font-weight: 300;
    font-size: 14px;
  }

  .md-content > div p {
    margin: 0;
    padding: 10px 0;
  }

  .md-content > div ul {
    margin: 0;
    padding: 0 0 30px 20px;
  }

  .md-content > div ul li {
    padding: 5px 0;
  }

  .md-content button {
    display: block;
    margin: 0 auto;
    font-size: 0.8em;
  }

  /* Effect 1: Fade in and scale up */
  .md-effect-1 .md-content {
    -webkit-transform: scale(0.7);
    -moz-transform: scale(0.7);
    -ms-transform: scale(0.7);
    transform: scale(0.7);
    opacity: 0;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    transition: all 0.3s;
  }

  .md-show.md-effect-1 .md-content {
    -webkit-transform: scale(1);
    -moz-transform: scale(1);
    -ms-transform: scale(1);
    transform: scale(1);
    opacity: 1;
  }

  .md-content > .closer {
    font-size: 18px;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 24px;
    padding: 4px;
  }

  @media only screen and (max-width: 1040px) {
    #viewer {
      width: 50%;
      margin-left: 25%;
    }

    #divider,
    #divider.show {
      display: none;
    }
  }

  @media only screen and (max-width: 900px) {
    #viewer {
      width: 60%;
      margin-left: 20%;
    }

    #prev {
      left: 20px;
    }

    #next {
      right: 20px;
    }
  }

  @media only screen and (max-width: 550px) {
    #viewer {
      width: 80%;
      margin-left: 10%;
    }

    #prev {
      left: 0;
    }

    #next {
      right: 0;
    }

    .arrow {
      height: 100%;
      top: 45px;
      width: 10%;
      text-indent: -10000px;
    }

    #main {
      -webkit-transform: translate(0, 0);
      -moz-transform: translate(0, 0);
      -ms-transform: translate(0, 0);
      -webkit-transition: -webkit-transform 0.3s;
      -moz-transition: -moz-transform 0.3s;
      -ms-transition: -moz-transform 0.3s;
    }

    #main.closed {
      -webkit-transform: translate(260px, 0);
      -moz-transform: translate(260px, 0);
      -ms-transform: translate(260px, 0);
    }

    #titlebar {
      /* font-size: 16px; */
      /* margin: 0 50px 0 50px; */
    }

    #metainfo {
      font-size: 10px;
    }

    #tocView {
      width: 260px;
    }

    #tocView li {
      font-size: 12px;
    }

    #tocView > ul {
      padding-left: 10px;
    }
  }

  /* For iPad portrait layouts only */
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: portrait) {
    #viewer iframe {
      width: 460px;
      height: 740px;
    }
  }
  /*For iPad landscape layouts only */
  @media only screen and (min-device-width: 481px) and (max-device-width: 1024px) and (orientation: landscape) {
    #viewer iframe {
      width: 460px;
      height: 415px;
    }
  }
  /* For iPhone portrait layouts only */
  @media only screen and (max-device-width: 480px) and (orientation: portrait) {
    #viewer {
      width: 256px;
      height: 432px;
    }
    #viewer iframe {
      width: 256px;
      height: 432px;
    }
  }
  /* For iPhone landscape layouts only */
  @media only screen and (max-device-width: 480px) and (orientation: landscape) {
    #viewer iframe {
      width: 256px;
      height: 124px;
    }
  }

  [class^='icon-']:before,
  [class*=' icon-']:before {
    font-family: 'fontello';
    font-style: normal;
    font-weight: normal;
    speak: none;

    display: inline-block;
    text-decoration: inherit;
    width: 1em;
    margin-right: 0.2em;
    text-align: center;
    /* opacity: .8; */

    /* For safety - reset parent styles, that can break glyph codes*/
    font-variant: normal;
    text-transform: none;

    /* you can be more comfortable with increased icons size */
    font-size: 112%;
  }

  .icon-search:before {
    content: '\e807';
  } /* '' */
  .icon-resize-full-1:before {
    content: '\e804';
  } /* '' */
  .icon-cancel-circled2:before {
    content: '\e80f';
  } /* '' */
  .icon-link:before {
    content: '\e80d';
  } /* '' */
  .icon-bookmark:before {
    content: '\e805';
  } /* '' */
  .icon-bookmark-empty:before {
    content: '\e806';
  } /* '' */
  .icon-download-cloud:before {
    content: '\e811';
  } /* '' */
  .icon-edit:before {
    content: '\e814';
  } /* '' */
  .icon-menu:before {
    /* content: '\e802'; */
  } /* '' */
  .icon-cog:before {
    content: '\e813';
  } /* '' */
  .icon-resize-full:before {
    /* content: '\e812'; */
  } /* '' */
  .icon-cancel-circled:before {
    content: '\e80e';
  } /* '' */
  .icon-up-dir:before {
    content: '\e80c';
  } /* '' */
  .icon-right-dir:before {
    content: '\e80b';
  } /* '' */
  .icon-angle-right:before {
    content: '\e809';
  } /* '' */
  .icon-angle-down:before {
    content: '\e80a';
  } /* '' */
  .icon-right:before {
    /* content: '\e815'; */
  } /* '' */
  .icon-list-1:before {
    content: '\e803';
  } /* '' */
  .icon-list-numbered:before {
    content: '\e801';
  } /* '' */
  .icon-columns:before {
    content: '\e810';
  } /* '' */
  .icon-list:before {
    content: '\e800';
  } /* '' */
  .icon-resize-small:before {
    content: '\e808';
  } /* '' */
`;
