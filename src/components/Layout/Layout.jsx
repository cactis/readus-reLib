import React from 'react';
import * as Styled from './Layout.styled.jsx';

const Flex = (props) => {
  return <Styled._Flex {...props}></Styled._Flex>;
};

const Col = (props) => {
  return <Styled._Col {...props}></Styled._Col>;
};
const Row = (props) => {
  return <Styled._Row {...props}></Styled._Row>;
};

const Header = (props) => {
  return <Styled._Header {...props}></Styled._Header>;
};

const Body = (props) => {
  return <Styled._Body {...props}></Styled._Body>;
};

const Footer = (props) => {
  return <Styled._Footer {...props}></Styled._Footer>;
};

const Side = (props) => {
  return <Styled._Side {...props}></Styled._Side>;
};

const Main = (props) => {
  return <Styled._Main {...props}></Styled._Main>;
};

const FileInput = (props) => {
  return <Styled._FileInput {...props}></Styled._FileInput>;
};

const Ellipsis = ({ data, children, ..._props }) => {
  return (
    <Styled._Ellipsis {..._props}>
      <div>{data || children}</div>
    </Styled._Ellipsis>
  );
};

const Float = (props) => {
  return <Styled._Float {...props}></Styled._Float>;
};

export {
  Body,
  Col,
  Ellipsis,
  FileInput,
  Flex,
  Float,
  Footer,
  Header,
  Main,
  Row,
  Side,
};
