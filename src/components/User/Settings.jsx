import React, { useEffect, useState } from 'react';
import { getAppSettings, jId, randStr, saveAppSettings } from '../../libs/lib';
import { Button, Field, Form } from '../Form';
import { Body, Header } from '../Layout/Layout.jsx';
import * as Styled from './Settings.styled.jsx';

export const Settings = (props) => {
  const id = randStr('Settings');

  let settings = getAppSettings();
  log(settings, 'settings in : ');
  useEffect(() => {}, []);

  let { token, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);
  let qrcode = `http://192.168.31.207:3000/relib?t=${token}`;

  const saveSettings = (e) => {
    $(jId(id))
      .find('.Field')
      .each((i, ele) => {
        let field = $(ele).attr('field');
        settings[field] = $(jId(field)).val();
      });

    log(settings, 'settings in : ');
    saveAppSettings(settings);
    stop(e);
  };

  const _return = (
    <Styled._Settings id={id} className={`${className}`} {..._props}>
      <Header>Settings</Header>
      <Body>
        {/* <Styled._Code defaultValue={token} /> */}
        {/* <QRCode data={qrcode} /> */}
        <Form>
          <Field
            label="Search Engine"
            type="input"
            field="searchEngineUrl"
            defaultValue={settings.searchEngineUrl}
          />
          {/* <Field label="Search Engine" type="input" />
          <Field label="Search Engine" type="input" /> */}
          <Button name="FiSave" label="Save" onClick={saveSettings} />
        </Form>
      </Body>
      {/* <Footer></Footer> */}
    </Styled._Settings>
  );

  return _return;
};
