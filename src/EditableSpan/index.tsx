import { ChangeEvent, useState } from 'react';
export type EditableSpanPropsType = {
  title: string;
  onChange: (title: string) => void;
};

function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  const activeViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const activeEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const editInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <>
      {editMode ? (
        <input
          onChange={editInputOnChangeHandler}
          onBlur={activeViewMode}
          value={title}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activeEditMode}>{props.title}</span>
      )}
    </>
  );
}

export default EditableSpan;
