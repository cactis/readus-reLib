import React, { useEffect, useState } from 'react';
import { randStr } from '../../libs/lib';
import * as Styled from './Icon.styled.jsx';
// import * as I from 'react-icons';
import * as ai from 'react-icons/ai';
import * as bi from 'react-icons/bi';
import * as bs from 'react-icons/bs';
import * as cg from 'react-icons/cg';
import * as ci from 'react-icons/ci';
import * as fa from 'react-icons/fa';
import * as fa6 from 'react-icons/fa6';
import * as fi from 'react-icons/fi';
import * as gi from 'react-icons/gi';
import * as go from 'react-icons/go';
import * as im from 'react-icons/im';
import * as io from 'react-icons/io';
import * as io5 from 'react-icons/io5';
import * as lu from 'react-icons/lu';
import * as md from 'react-icons/md';
import * as pi from 'react-icons/pi';
import * as ri from 'react-icons/ri';
import * as tb from 'react-icons/tb';
import * as tf from 'react-icons/tfi';

export const Icon = (props) => {
  //
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
      fi,
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
      ai,
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
      //
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
