import React, { useState, useEffect, Suspense } from 'react';
import * as Styled from './Icon.styled.jsx';
import { log, randStr } from '../../libs/lib';
// import * as I from 'react-icons';
import * as md from 'react-icons/md';
import * as bi from 'react-icons/bi';
import * as tf from 'react-icons/tfi';
import * as go from 'react-icons/go';
import * as tb from 'react-icons/tb';
import * as ci from 'react-icons/ci';
import * as io from 'react-icons/io';
import * as io5 from 'react-icons/io5';
import * as cg from 'react-icons/cg';

export const Icon = (props) => {
  const root = React.createRef();
  const id = randStr('Icon');
  let _Icon;
  let { label, name, children, className = '', ..._props } = props;
  if (name) {
    let modules = [go, md, bi, io, tf, tb, ci, io5, cg];
    let module = modules.filter(
      (module, i) => typeof module[name] == 'function',
    )[0];
    _Icon = module[name]();
  }
  useEffect(() => {}, []);
  const [data, setdata] = useState(props.data || []);
  const _return = (
    <Styled._Icon id={id} ref={root} className={`${className}`} {..._props}>
      {_Icon}
      {label}
    </Styled._Icon>
  );

  return _return;
};
