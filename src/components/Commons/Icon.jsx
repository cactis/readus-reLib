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
  let { label, name, children, className = '', ..._props } = props;
  let lib = _.lowerCase(name.slice(0, 2));

  log(lib, 'lib in : ');
  log(name, 'name in : ');

  // let modules = {
  //   go: go,
  //   md: md,
  //   bi: bi,
  //   io: io,
  //   tf: tf,
  //   tb: tb,
  //   ci: ci,
  //   io5: io5,
  // };
  let modules = [go, md, bi, io, tf, tb, ci, io5, cg];
  log(modules, 'modules in : ');
  log([lib, name], '[lib, name] in : ');
  let module = modules.filter(
    (module, i) => typeof module[name] == 'function',
  )[0];
  log(module, 'module in : ');
  let _Icon = module[name]();
  log(_Icon, '_Icon in : ');
  // [0]
  // [name]();
  // modules[lib][name]();

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
