import React, { useState, useEffect } from 'react';
import * as Styled from './Reader.styled.jsx';
import { Body, Button, Footer, Header, Main, Side } from './Layout/Layout.jsx';
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

  const defaultDocumentTitle = document.title;
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
    window._book = _reader.book;

    // _reader.book.locations.generate(512).then((_) => {
    //   _reader.book.locations.save();
    //   log(_reader.book.locations, '_reader.book.locations in : ');
    //   updatePageInfo();
    // });

    log(_reader, '_reader in : ');

    _reader.rendition.on('rendered', async function (section) {
      log(section, 'section in : ');
      // updatePageInfo(_reader.rendition.currentLocation().start.cfi);
    });
    _reader.rendition.on('relocated', function (location) {
      console.log(
        '翻页 cfirange.start=' +
          location.start.cfi +
          '; cfirange.end=' +
          location.end.cfi,
      );
      console.log('total: ' + location.start.displayed.total);
      console.log('page: ' + location.start.displayed.page);
    });
    _reader.rendition.hooks.content.register((contents, rendition) => {
      // rendition.book.locations.generate(1024);
      log([contents, rendition], '[contents, rendition] in : ');
      log(
        rendition.book.locations.total,
        'rendition.book.locations.total. in : ',
      );
      customStyle();
    });
    $('#next, #prev').bind('click', (e) => {
      updatePageInfo();
    });
  };

  const customStyle = () => {
    let $iframe = $('iframe');
    // log($iframe, '$iframe in : ');
    let header = $iframe.contents().find('head');
    // log(header, 'header in : ');

    $(header).find('style').remove();

    let style = `<style>${EpubReaderCss}</style>`;
    // log('customStyle');
    header.append(style);
  };

  let { children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const saveBookPosition = () => {
    let location = _reader.rendition.currentLocation();
    log(location, 'location in : ');
    let startCfi = location.start?.cfi;
    updatePageInfo(startCfi);
    log(startCfi, 'startCfi in : ');
    window.startCfi = startCfi;

    _reader.saveSettings();
    // var books_json = await window.bookConfig.getBooks()
    // await window.bookConfig.changeBookValue(
    //   books_json,
    //   epubCodeSearch,
    //   "lastPageOpened",
    //   startCfi
    // )
  };

  const updatePageInfo = (cfi) => {
    cfi = _reader.rendition.currentLocation().start.cfi;
    // log([location, cfi], '[location, cfi] in : ');
    // let { page, total } = location.start.displayed;
    // log([page, total], '[page, total] in : ');
    let book_epub = _reader.book;
    var total_pages = book_epub.locations.total;
    var progress = Math.floor(
      book_epub.locations.percentageFromCfi(cfi) * total_pages,
    );
    log([progress, total_pages], '[progress, total_pages] in : ');
    $('#page-number').text(`${progress} / ${total_pages}`);
  };

  const _return = (
    <Styled._Reader
      id={id}
      ref={root}
      className={`${className} __`}
      {..._props}
    >
      <Button
        onClick={(e) => {
          saveBookPosition();
          document.title = defaultDocumentTitle;
          $(e.target).closest('wrapper').fadeOut(500).delay(1000).remove();
        }}
      >
        X
      </Button>
      {/* <Header className={`_`}></Header> */}
      <Body className={`__`}>
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
          <Styled._TitleBar id="titlebar" className={`__`}>
            <Side>
              <div id="opener">
                <a id="slider" className="icon-menu_">
                  <TfiMenuAlt id="slider" />
                </a>
              </div>
            </Side>
            <Main className={``}>
              <Styled._MainL>
                <div id="metainfo">
                  <span id="book-title"></span>
                  {/* <span id="title-seperator">&nbsp;&nbsp;–&nbsp;&nbsp;</span> */}
                  {/* <span id="chapter-title__"></span> */}
                </div>
              </Styled._MainL>
              <Styled._MainR>Chapter Title</Styled._MainR>
            </Main>
            <Side>
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
            </Side>
          </Styled._TitleBar>

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
      </Body>
      <Footer className={`__`}>
        <Styled._FooterL id="chapter-title">作者名稱</Styled._FooterL>
        <Styled._FooterR id="page-number"></Styled._FooterR>
      </Footer>
    </Styled._Reader>
  );

  return _return;
};
