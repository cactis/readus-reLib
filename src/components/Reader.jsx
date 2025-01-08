import React, { useState, useEffect } from 'react';
import * as Styled from './Reader.styled.jsx';
import { Body, Button, Footer, Header, Main, Side } from './Layout/Layout.jsx';
import { log, randStr, stop } from '../libs/lib.js';
import {
  EpubReaderContentCss,
  EpubReaderCss,
} from './EpubReaderContentCss.styled.jsx';
import { Icon } from './Commons/Icon.jsx';
const _ = require('lodash');

// require('../../vendors/jszip.min.js')
// import { ePub } from '../js/epub.js'
// import { ePubReader } from '../libs/reader.js';
export const Reader = (props) => {
  const root = React.createRef();
  const id = randStr('Reader');

  const defaultDocumentTitle = document.title;
  const [url, seturl] = useState(props.url);

  let epub, book, rendition;

  var controls, slider;
  var slide = function () {
    let percent = slider.value;
    log(percent, 'percent in : ');
    var cfi = book.locations.cfiFromPercentage(percent);
    log(cfi, 'cfi in slide: ');
    rendition.display(cfi);
  };
  var mouseDown = false;

  useEffect(() => {
    controls = document.getElementById('controls');
    slider = document.getElementById('current-percent');
  }, []);

  useEffect(() => {
    window.url = url;
    loadEpub();
  }, [url]);

  const loadEpub1 = async () => {
    let epub = ePub(url);
    window.epub = epub;
    log(window.epub, 'window.epub in : ');
    rendition = epub.renderTo('viewer', {
      flow: 'paginated',
      manager: 'default',
      width: '100%',
      header: '100%',
      // manager: bookLayoutStyle.manager,
      // flow: bookLayoutStyle.flow,
      // width: bookLayoutStyle.width,
      // height: '100%',
    });
    // if (book_infos.lastPageOpened != null) {
    //   rendition.display(book_infos.lastPageOpened)
    // } else {
    rendition.display();
    // }
    epub.ready
      .then(function () {
        const stored = localStorage.getItem(epub.key() + '-locations');
        // log(stored, 'stored in : ');
        if (stored) {
          return epub.locations.load(stored);
        } else {
          return epub.locations.generate(1024); // Generates CFI for every X characters (Characters per/page)
        }
      })
      .then(function (locations) {
        localStorage.setItem(epub.key() + '-locations', epub.locations.save());
      });

    $('#prev')
      .off('click')
      .on('click', async function () {
        rendition.prev();

        // updateSavePagesButton(book_saved_pages, current_cfi)
        updatePageNumber();
      });
    $('#next')
      .off('click')
      .on('click', async function () {
        rendition.next();
        // updateSavePagesButton(book_saved_pages, current_cfi)
        updatePageNumber();
      });
    rendition.hooks.content.register((contents, rendition) => {
      // rendition.book.locations.generate(1024);
      // log([contents, rendition], '[contents, rendition] in : ');
      // log(
      //   rendition.book.locations.total,
      //   'rendition.book.locations.total. in : ',
      // );
      customStyle();
    });
  };

  const loadEpub = async () => {
    log(window.ePubReader, 'window.ePubReader in : ');
    let _reader = window.ePubReader(url, {
      restore: true,
      contained: true,
      styles: EpubReaderCss,
      // generatePagination: true,
      history: true,
    });

    book = epub = _reader.book;
    rendition = _reader.rendition;

    await epub.ready
      .then(function () {})
      .then(function (locations) {
        log([controls, slider], '[controls, slider] in : ');
        slider.setAttribute('type', 'range');
        slider.setAttribute('min', 0);
        slider.setAttribute('max', 100);
        // slider.setAttribute("max", book.locations.total+1);
        slider.setAttribute('step', 1);
        slider.setAttribute('value', 0);

        slider.addEventListener('change', slide, false);
        slider.addEventListener(
          'mousedown',
          function () {
            mouseDown = true;
          },
          false,
        );
        slider.addEventListener(
          'mouseup',
          function () {
            mouseDown = false;
          },
          false,
        );
      });
    // rendition.display().then((location) => {
    //   log(location, 'location in : ');
    //   var currentLocation = rendition.currentLocation();
    //   // Get the Percentage (or location) from that CFI
    //   var currentPage = book.locations.percentageFromCfi(
    //     currentLocation.start.cfi,
    //   );
    //   log(currentPage, 'currentPage in : ');
    //   // slider.value = currentPage;
    //   // currentPage.value = currentPage;
    // });

    // .displayed((e) => {
    //   var currentLocation = rendition.currentLocation();
    //   // Get the Percentage (or location) from that CFI
    //   var currentPage = book.locations.percentageFromCfi(
    //     currentLocation.start.cfi,
    //   );
    // });
    log(_reader.book.locations.totals, '_reader.book.locations.totals in : ');

    window._reader = _reader;
    window.epub = epub;

    // _reader.rendition.on('selectionChanged', async (e) => {
    //   log(e, 'e in : selectionChanged');
    // });
    _reader.rendition.on('locationChanged', async (location) => {
      log(location, 'location in locationChanged: ');
      const spineItem = location.start.cfi
        ? book.spine.get(location.start.cfi.idref)
        : book.spine.items[location.start.index];
      log(spineItem, 'spineItem in : ');
      let href = _.last(location.href?.split('/'));
      log(href, 'href in : ');
      let title = book.navigation.toc.filter(
        (item, _) => item.href.indexOf(href) > -1,
      )[0];
      log(book.navigation.toc, 'book.navigation.toc in : ');
      log(title, 'title in : ');
      title = title?.label.replace(/[\\n\s]/g, '');
      log(title, 'title.label in : ');
      $('#chapter-label').text(title);
    });
    // log(window._reader, 'window._reader in : ');

    // let totalPages = 0;
    // for (const item of book.spine.items) {
    //   // const locations = await rendition.getLocations(item);
    //   // totalPages += locations.length;
    // }
    // log(totalPages, 'totalPages in : ');
    // // totalPagesDisplay.textContent = totalPages;
    // // _reader.book.locations.generate(512).then((_) => {
    // //   _reader.book.locations.save();
    // //   log(_reader.book.locations, '_reader.book.locations in : ');
    // //   updatePageNumber();
    // // });

    // log(_reader, '_reader in : ');

    // rendition.on('rendered', async function (section) {
    //   log(section, 'section in : ');
    //   // updatePageNumber();
    // });

    // rendition.on('relocated', function (location) {
    //   var percent = book.locations.percentageFromCfi(location.start.cfi);
    //   var percentage = Math.floor(percent * 100);
    //   // if(!mouseDown) {
    //   //     slider.value = percentage;
    //   // }
    //   // currentPage.value = percentage;
    //   console.log(percentage);
    // });

    rendition.on('relocated', function (location) {
      log(location, 'location in : ');
      updatePageNumber();

      var percent = book.locations.percentageFromCfi(location.start.cfi);
      log(percent, 'percent in : ');
      var percentage = Math.floor(percent * 100);
      if (!mouseDown) {
        slider.value = percentage;
      }
      log(percentage, 'percentage in : ');
      // currentPage.value = percentage;
      console.log(location);

      // var percent = book.locations.percentageFromCfi(location.start.cfi);
      // log(percent, 'percent in : ');
      // var percentage = Math.floor(percent * 100);
      // log(percentage, 'percentage in : ');
      // // if(!mouseDown) {
      // // 		slider.value = percentage;
      // // }
      // // currentPage.value = percentage;
      // // console.log(location);
      // console.log(
      //   '翻页 cfirange.start=' +
      //     location.start.cfi +
      //     '; cfirange.end=' +
      //     location.end.cfi,
      // );
      // console.log('total: ' + location.start.displayed.total);
      // console.log('page: ' + location.start.displayed.page);
    });

    rendition.hooks.content.register((contents, rendition) => {
      // rendition.book.locations.generate(1024);
      log([contents, rendition], '[contents, rendition] in : ');
      log(
        rendition.book.locations.total,
        'rendition.book.locations.total. in : ',
      );
      customStyle();
    });

    // $('#next, #prev').bind('click', (e) => {
    //   log('#next, #prev clicked');
    //   updatePageNumber();
    // });
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
    let location = rendition.currentLocation();
    log(location, 'location in : ');
    let startCfi = location.start?.cfi;
    updatePageNumber();
    log(startCfi, 'startCfi in : ');
    window.startCfi = startCfi;

    // epub.locations.save();
    // _reader.saveSettings();
    // var books_json = await window.bookConfig.getBooks()
    // await window.bookConfig.changeBookValue(
    //   books_json,
    //   epubCodeSearch,
    //   "lastPageOpened",
    //   startCfi
    // )
  };

  const updatePageNumber = () => {
    var location = rendition.currentLocation();
    log(location, 'location: updatePageNumber');
    let { start, end } = location;
    let page = start.displayed.page;
    let total = start.displayed.total;
    // var total_pages = epub.locations.total;
    // console.log(total_pages, 'total_pages');
    // var page = Math.floor(
    //   epub.locations.percentageFromCfi(cfi) * total_pages,
    // );

    // cfi = _reader.rendition.currentLocation().start.cfi;
    // log([location, cfi], '[location, cfi] in : ');
    // let { page, total } = location.start.displayed;
    // log([page, total], '[page, total] in : ');
    // let book = _reader.book;
    // var total_pages = book.locations.total;
    // var page = Math.floor(
    //   book.locations.percentageFromCfi(cfi) * total_pages,
    // );
    log([page, total], '[page, total] in : ');
    $('#page-number').text(`${page} / ${total}`);
  };

  const _return = (
    <Styled._Reader
      id={id}
      ref={root}
      className={`${className} __`}
      {..._props}
    >
      <Icon
        name="MdClose"
        className={`round`}
        id="close-reader"
        onClick={(e) => {
          saveBookPosition();
          _reader.unload();
          document.title = defaultDocumentTitle;
          $(e.target).closest('wrapper').fadeOut(500).delay(1000).remove();
        }}
      />
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
                  <Icon name="TfiMenuAlt" id="slider" />
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
              <Styled._MainR id="chapter-label"></Styled._MainR>
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
      <Styled._PageSlider>
        <Styled._FooterM>
          <div id="controls">
            <input
              id="current-percent"
              size="1"
              type="range"
              defaultValue={0}
            />
          </div>
        </Styled._FooterM>
      </Styled._PageSlider>
      <Footer className={`__`}>
        <Styled._FooterL id="chapter-title">作者名稱</Styled._FooterL>
        <Styled._FooterR id="page-number"></Styled._FooterR>
      </Footer>
    </Styled._Reader>
  );

  return _return;
};
