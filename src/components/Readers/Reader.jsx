import React, { useEffect, useState } from 'react';
import { Icon } from '../Commons';
import { EpubReaderCss } from '../EpubReaderContentCss.styled';
import { Body, Footer, Main, Side } from '../Layout';
import * as Styled from './Reader.styled.jsx';

const _ = require('lodash');

export const Reader = (props) => {
  const id = randStr('Reader');
  const token = randStr('reader-token');
  log(token, 'token in : ');
  let $reader;
  let $root;

  const defaultDocumentTitle = document.title;
  const [url, seturl] = useState(props.url);

  let epub, book, rendition;

  var controls, slider;
  var slide = function () {
    runLast(() => {
      let percent = slider.value / 100;
      // log(percent, 'percent in : ');
      var cfi = book.locations.cfiFromPercentage(percent);
      // log(cfi, 'cfi in slide: ');
      rendition.display(cfi);
    }, 300);
  };
  var mouseDown = false;

  useEffect(() => {
    $root = $(jId(id));
    $reader = $(`.Reader.${token}`);
    // log($reader, '$reader in : Reader#useEffect');

    controls = $reader.find('#controls')[0];
    slider = $reader.find('#current-percent')[0];
    // log([controls, slider], '[controls, slider] in : ');

    delayed(() => {
      observeResize();
    });
  }, []);

  useEffect(() => {
    window.url = url;
    loadEpub();
  }, [url]);

  let _reader;
  const loadEpub = async () => {
    log(url, 'url in : ');
    // log(window.ePubReader, 'window.ePubReader in : ');
    _reader = ePubReader(
      url,
      {
        restore: true,
        contained: true,
        styles: EpubReaderCss,
        // generatePagination: true,
        history: true,
      },
      token,
    );

    book = epub = _reader.book;
    rendition = _reader.rendition;
    // var displayed = rendition.display();

    await epub.ready
      .then(function () {
        var key = book.key() + '-locations';
        var stored = localStorage.getItem(key);
        if (stored) {
          book.locations.load(stored);
          let { location } = book.rendition;
          // updateSlider({ location });
          updatePageNumber();
          return false;
        } else {
          // Or generate the locations on the fly
          // Can pass an option number of chars to break sections by
          // default is 150 chars
          return book.locations.generate(500);
        }
      })
      .then(function (locations) {
        if (!slider) return false;
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

        // rendition.display().then(function () {
        //   var currentLocation = _reader.rendition.currentLocation();
        //   log(currentLocation, 'currentLocation in : ');
        //   var currentPage = book.locations.percentageFromCfi(
        //     currentLocation.start.cfi,
        //   );
        //   log(currentPage, 'currentPage in : ');
        //   // slider.value = currentPage;
        //   // currentPage.value = currentPage;
        // });
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
    // log(_reader.book.locations.totals, '_reader.book.locations.totals in : ');
    updatePageNumber();

    window._reader = _reader;
    window.epub = epub;

    // _reader.rendition.on('selectionChanged', async (e) => {
    //   log(e, 'e in : selectionChanged');
    // });
    _reader.rendition.on('locationChanged', async (location) => {
      runLast(() => {
        // log(location, 'location in locationChanged: ');
        let cfi = location.start;
        // log(cfi, 'cfi in locationChanged: ');
        let percent = book.locations.percentageFromCfi(cfi);
        // log(percent, 'percent in locationChanged: ');
        updateSlider({ percent });

        const spineItem = location.start.cfi
          ? book.spine.get(location.start.cfi.idref)
          : book.spine.items[location.start.index];
        // log(spineItem, 'spineItem in : ');
        let href = _.last(location.href?.split('/'));
        // log(href, 'href in : ');
        let title = book.navigation.toc.filter(
          (item, _) => item.href.indexOf(href) > -1,
        )[0];
        // log(book.navigation.toc, 'book.navigation.toc in : ');
        // log(title, 'title in : ');
        title = title?.label.replace(/[\\n\s]/g, '');
        // log(title, 'title.label in : ');
        // updateSlider(location);
        $('#chapter-label').text(title);
      }, 300);
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

  const updateSlider = ({ percent, location }) => {
    if (percent) {
      log(percent, 'percent in updateSlider: ');
      if (!mouseDown) {
        var percentage = Math.floor(percent * 100);
        slider.value = percentage;
      }
    }
    if (location) {
      log(location, 'location in updateSlider: ');
      log(book.locations, 'book.locations in : ');
      percent = book.locations.percentageFromCfi(location.start.cfi);
      log(percent, 'percent in : ');
      var percentage = Math.floor(percent * 100);
      if (!mouseDown) {
        slider.value = percentage;
      }
      log(percentage, 'percentage in : ');
      // currentPage.value = percentage;
      console.log(location);
    }
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
    log(rendition, 'rendition in : ');
    let location = rendition.currentLocation();
    let startCfi = location.start?.cfi;
    updatePageNumber();
    window.startCfi = startCfi;

    // epub.locations.save();
    _reader.saveSettings();
    // var books_json = await window.bookConfig.getBooks()
    // await window.bookConfig.changeBookValue(
    //   books_json,
    //   epubCodeSearch,
    //   "lastPageOpened",
    //   startCfi
    // )
  };

  const updatePageNumber = () => {
    if (!rendition) return false;
    var location = rendition.currentLocation();
    log(location, 'location: updatePageNumber');
    if (!location) return false;

    let { start, end } = location;
    if (!start) return false;
    let page = start.displayed.page;
    let total = start.displayed.total;

    updateSlider({ location });
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
    <Styled._Reader id={id} className={`${className} ${token}`} {..._props}>
      <Icon
        $if={false}
        name="MdClose"
        className={`round`}
        id="close-reader"
        onClick={(e) => {
          saveBookPosition();
          // _reader.unload();
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
        <div id={`main`}>
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
                  {/* <Styled._FooterL id="chapter-title"></Styled._FooterL> */}
                  {/* <span id="title-seperator">&nbsp;&nbsp;–&nbsp;&nbsp;</span> */}
                  {/* <span id="chapter-title__"></span> */}
                </div>
              </Styled._MainL>
              <Styled._MainR>
                <div id="chapter-label"></div>
                {/* <Styled._FooterR id="page-number"></Styled._FooterR> */}
                {/* <div id="page-number"></div> */}
              </Styled._MainR>
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
          <div id={`viewer`}></div>
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

  const observeResize = () => {
    function onRootResize(e) {
      let width = $root[0].offsetWidth;
      let height = $root[0].offsetHeight;
      // log([width, height], '[width, height] in : ');
      // log(e, 'e in Reader resize: ');
      $(slider).trigger('change');
    }
    log($root[0], '$root[0] in : ');
    new ResizeObserver(onRootResize)?.observe($root[0]);
  };
  return _return;
};
