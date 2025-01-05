import React, { useState, useEffect } from 'react';
import * as Styled from './Layout.styled.jsx';
import { delayed, stop } from '../../libs/lib.js';

export const Header = (props) => {
  return <Styled._Header {...props}></Styled._Header>;
};

export const Body = (props) => {
  return <Styled._Body {...props}></Styled._Body>;
};

export const Footer = (props) => {
  return <Styled._Footer {...props}></Styled._Footer>;
};

export const Side = (props) => {
  return <Styled._Side {...props}></Styled._Side>;
};

export const Main = (props) => {
  return <Styled._Main {...props}></Styled._Main>;
};

export const Button = (props) => {
  return <Styled._Button {...props}></Styled._Button>;
};

export const FileInput = (props) => {
  return <Styled._FileInput {...props}></Styled._FileInput>;
};

export const Popup = (props) => {
  return (
    <Styled._Popup
      onClick={(e) => {
        let $t = $(e.target).closest('.unwrappable');
        $t.fadeOut();
        delayed(() => {
          $t.remove();
        });
        stop(e);
      }}
      {...props}
    />
  );
};
