import React from 'react';
import { ChangeEvent, useState } from 'react';

export type TodolistInputType = {
  addItem: (inputValue: string) => void;
};

const TodolistInput: React.FC<TodolistInputType> = (props) => {
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<boolean | null>(false);

  const addItem = () => {
    if (inputValue.trim() === '') {
      setError((prevError) => (prevError ? prevError : !prevError));
      return;
    }

    props.addItem(inputValue);
    setInputValue('');
  };

  const onKeyPressEnterHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.charCode === 13) {
      addItem();
    }
  };

  const onChangeTodolistInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputValue.trim() === '') {
      setError((prevError) => (prevError ? !prevError : null));
    }
    setInputValue(e.currentTarget.value);
  };

  return (
    <div className="flex items-center justify-between h-[80px] p-4 gap-4 rounded-md relative bg-violet-200">
      <input
        value={inputValue}
        onChange={onChangeTodolistInputHandler}
        onKeyPress={onKeyPressEnterHandler}
        className={`
          w-full border rounded-md outline-none grow-1 p-2 text-[1.5rem]
          ${error ? 'error__active' : 'todolist__input'}
        `}
      />
      <button
        className="border block border-spacing-2 text-[1.65rem] border-violet-400 h-full px-4 rounded-md duration-150 active:bg-violet-400"
        onClick={addItem}
      >
        +
      </button>
      {error && (
        <div className="error-message absolute -bottom-6 text-[1rem]">
          Title is required
        </div>
      )}
    </div>
  );
};

export default TodolistInput;
