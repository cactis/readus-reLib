import React, { useState, useEffect } from 'react';
import * as Styled from './Reader.styled.jsx';
import { Button } from './Layout/Layout.jsx';
import { log, randStr, stop } from '../libs/lib.js';
import {
  EpubReaderContentCss,
  EpubReaderCss,
} from './EpubReaderContentCss.styled.jsx';
import { TfiMenuAlt } from 'react-icons/tfi';

// require('../../vendors/jszip.min.js')
// import { ePub } from '../js/epub.js'
// import { ePubReader } from '../libs/reader.js';

export const Reader = (props) => {
  const root = React.createRef();
  const id = randStr('Reader');

  const [url, seturl] = useState(props.url);

  useEffect(() => {
    window.url = url;
    loadEpub();
  }, [url]);

  const loadEpub = async () => {
    log(window.ePubReader, 'window.ePubReader in : ');
    let _reader = window.ePubReader(url, {
      restore: true,
      contained: true,
      styles: EpubReaderCss,
      // generatePagination: true,
      history: true,
    });
    await _reader.book.ready;
    window._reader = _reader;
    log(_reader, '_reader in : ');
    _reader.rendition.hooks.content.register((contents, view) => {
      customStyle();
    });
  };

  const customStyle = () => {
    let $iframe = $('iframe');
    log($iframe, '$iframe in : ');
    let header = $iframe.contents().find('head');
    log(header, 'header in : ');

    $(header).find('style').remove();

    let style = `<style>${EpubReaderCss}</style>`;
    log('customStyle');
    header.append(style);
  };

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const saveBookPosition = () => {
    let location = _reader.rendition.currentLocation();
    log(location, 'location in : ');
    let cfiString = location.start.cfi;
    log(cfiString, 'cfiString in : ');
    window.cfiString = cfiString;
    _reader.saveSettings();
    // var books_json = await window.bookConfig.getBooks()
    // await window.bookConfig.changeBookValue(
    //   books_json,
    //   epubCodeSearch,
    //   "lastPageOpened",
    //   cfiString
    // )
  };

  const _return = (
    <Styled._Reader id={id} ref={root} className={`${className}`} {..._props}>
      <Button
        onClick={(e) => {
          saveBookPosition();

          $(e.target).closest('wrapper').fadeOut(500).delay(1000).remove();
        }}
      >
        X
      </Button>
      <div id="sidebar">
        <div id="panels">
          <a
            id="show-Toc"
            className="show_view icon-list-1 active"
            data-view="Toc"
          >
            TOC
          </a>
          <a
            id="show-Bookmarks"
            className="show_view icon-bookmark"
            data-view="Bookmarks"
          >
            Bookmarks
          </a>
        </div>
        <div id="tocView" className="view"></div>
        <div id="searchView" className="view">
          <ul id="searchResults"></ul>
        </div>
        <div id="bookmarksView" className="view">
          <ul id="bookmarks"></ul>
        </div>
        <div id="notesView" className="view">
          <div id="new-note">
            <textarea id="note-text"></textarea>
            <button id="note-anchor">Anchor</button>
          </div>
          <ol id="notes"></ol>
        </div>
      </div>
      <div id="main">
        <div id="titlebar" className={``}>
          <div id="opener">
            <a id="slider" className="icon-menu_">
              <TfiMenuAlt id="slider" />
            </a>
          </div>
          <div id="metainfo">
            <span id="book-title"></span>
            {/* <span id="title-seperator">&nbsp;&nbsp;–&nbsp;&nbsp;</span> */}
            <span id="chapter-title"></span>
          </div>
          <div id="title-controls">
            {/* <a id="bookmark" className="icon-bookmark-empty">
              Bookmark
            </a>
            <a id="setting" className="icon-cog">
              Settings
            </a> */}
            {/* <a id="fullscreen" className="icon-resize-full">
              Fullscreen
            </a> */}
          </div>
        </div>

        <div id="divider"></div>
        <div id="prev" className="arrow">
          ‹
        </div>
        <div id="viewer"></div>
        <div id="next" className="arrow">
          ›
        </div>

        <div id="loader">{/* <img src="img/loader.gif" /> */}</div>
      </div>
      <div className="modal md-effect-1" id="settings-modal">
        <div className="md-content">
          <h3>Settings</h3>
          <div>
            <p>
              {/* <input type="checkbox" id="sidebarReflow" name="sidebarReflow">Reflow text when sidebars are open. */}
            </p>
          </div>
          <div className="closer icon-cancel-circled"></div>
        </div>
      </div>
      <div className="overlay"></div>
    </Styled._Reader>
  );

  return _return;
};
