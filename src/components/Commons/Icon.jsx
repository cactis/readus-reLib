import React, { useState, useEffect, Suspense } from 'react';
import * as Styled from './Icon.styled.jsx';
import { log, randStr } from '../../libs/lib';
// import * as I from 'react-icons';
import * as md from 'react-icons/md';
import * as bi from 'react-icons/bi';
import * as tf from 'react-icons/tfi';
import * as fa from 'react-icons/fa';
import * as fa6 from 'react-icons/fa6';
import * as go from 'react-icons/go';
import * as tb from 'react-icons/tb';
import * as ci from 'react-icons/ci';
import * as io from 'react-icons/io';
import * as io5 from 'react-icons/io5';
import * as cg from 'react-icons/cg';
import * as im from 'react-icons/im';
import * as pi from 'react-icons/pi';
import * as lu from 'react-icons/lu';
import * as gi from 'react-icons/gi';
import * as ri from 'react-icons/ri';
import * as bs from 'react-icons/bs';

export const Icon = (props) => {
  const root = React.createRef();
  const id = randStr('Icon');
  let _Icon;
  let {
    $if,
    label,
    name,
    tip = label,
    children,
    className = '',
    ..._props
  } = props;
  if ($if == false) return null;
  if (name) {
    let modules = [
      go,
      md,
      bi,
      io,
      fa6,
      ri,
      gi,
      fa,
      tf,
      tb,
      ci,
      io5,
      cg,
      im,
      bs,
      pi,
      lu,
    ];
    let module = modules.filter(
      (module, i) => typeof module[name] == 'function',
    )[0];
    _Icon = module[name]();
  }
  useEffect(() => {}, []);
  const [data, setdata] = useState(props.data || []);
  const _return = (
    <Styled._Icon
      id={id}
      ref={root}
      className={`${className}`}
      {..._props}
      title={tip}
    >
      {_Icon}
      {label}
    </Styled._Icon>
  );

  return _return;
};
