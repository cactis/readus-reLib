import EditorJS from '@editorjs/editorjs';
import React, { useEffect, useState } from 'react';
import { Icon } from '../Commons/Icon.jsx';
import { Field } from '../Form/Field.jsx';
import * as Styled from './Editor.styled.jsx';

export const Editor = (props) => {
  const id = randStr('Editor');
  let editor;

  useEffect(() => {
    loadEditorJs();
  }, []);

  let { onSave, children, className = '', ..._props } = props;
  const [data, setdata] = useState(props.data || []);

  const saveWrite = (e) => {
    editor?.save().then((json) => {
      log(json, 'json in : ');
      let title = $('#title').val();
      let data = { title, json };
      log(data, 'data in : ');
      onSave && onSave(data);
    });
  };

  const _return = (
    <Styled._Editor id={id} className={`${className}`} {..._props}>
      <Styled._Title>
        <Field
          type="input"
          field="title"
          placeholder="Subject"
          defaultValue={randStr('Title')}
        ></Field>
      </Styled._Title>
      <Styled._Content>
        <Styled._EditorJs id="editorjs"></Styled._EditorJs>
      </Styled._Content>
      <Styled._Actions>
        <Icon name="AiOutlineSave" label="Save" onClick={saveWrite} />
      </Styled._Actions>
    </Styled._Editor>
  );

  const loadEditorJs = () => {
    if (editor) return false;
    editor = new EditorJS({
      holder: 'editorjs',
      // readOnly: true,
      placeholder: 'Let`s write an awesome story!',
      autofocus: true,
      tools: {},
    });
  };
  return _return;
};
