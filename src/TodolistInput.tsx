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
    <>
      <input
        value={inputValue}
        onChange={onChangeTodolistInputHandler}
        onKeyPress={onKeyPressEnterHandler}
        className={error ? 'error__active' : ''}
      />
      <button onClick={addItem}>+</button>
      {error && <div className="error-message">Title is required</div>}
    </>
  );
};

export default TodolistInput;
