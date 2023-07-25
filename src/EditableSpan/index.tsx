import { ChangeEvent, useState } from 'react';
export type EditableSpanPropsType = {
  title: string;
  onChange: (title: string) => void;
  removeTask:() => void
};

function EditableSpan(props: EditableSpanPropsType) {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');

  const changeViewMode = () => {
    setEditMode(!editMode);
    props.onChange(title);
    setTitle(props.title);
  };

  const editInputOnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };  

  return (
    <div className="flex items-center h-full grow-1 relative">
      {editMode ? (
        <input className='bg-violet-200 outline-none pl-2 border border-violet-500' onChange={editInputOnChangeHandler} value={title} />
      ) : (
        <p className='text-[1.15rem] grow-1'>{props.title}</p>
      )}
      <span className="flex items-center">
        <button
          className="px-2 border border-violet-500"
          onClick={changeViewMode}
        >
          {!editMode ? 'Edit' : 'Fixed'}
        </button>
        <button
          className="px-2 border border-violet-500"
          onClick={props.removeTask}
        >
          x
        </button>
      </span>
    </div>
  );
}

export default EditableSpan;
