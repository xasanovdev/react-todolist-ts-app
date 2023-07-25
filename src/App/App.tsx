import { useState } from 'react';
import './App.css';
import Todolist, { TaskType } from '../Todolist';
import { v4 as uuidv4 } from 'uuid';
import TodolistInput from '../TodolistInput';

export type FilterValuesType = 'All' | 'Completed' | 'Active';

export type TaskslistType = {
  [key: string]: Array<TaskType>;
};

export type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  const todolist1 = uuidv4();
  const todolist2 = uuidv4();

  const [tasksObj, setTasks] = useState<TaskslistType>({
    [todolist1]: [
      { id: uuidv4(), title: 'Html', isDone: true },
      { id: uuidv4(), title: 'Css', isDone: true },
      { id: uuidv4(), title: 'Js', isDone: true },
      { id: uuidv4(), title: 'React', isDone: false },
      { id: uuidv4(), title: 'Redux', isDone: false },
    ],
    [todolist2]: [
      { id: uuidv4(), title: 'Milk', isDone: true },
      { id: uuidv4(), title: 'Chocolate', isDone: true },
      { id: uuidv4(), title: 'Meat', isDone: true },
      { id: uuidv4(), title: 'Fruits', isDone: false },
    ],
  });

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolist1, title: 'What to learn?', filter: 'All' },
    { id: todolist2, title: 'What to buy?', filter: 'All' },
  ]);

  function filteredTasks(value: FilterValuesType, todolistId: string) {
    const todolist = todolists.find((todolist) => todolist.id === todolistId);
    if (todolist) {
      todolist.filter = value;
      setTodolists([...todolists]);
    }
  }

  function changeTaskStatus(taskId: string, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const updateTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });
    tasksObj[todolistId] = updateTasks;
    setTasks({ ...tasksObj });
  }
  function changeTaskTitle(taskId: string, todolistId: string, title: string) {
    const tasks = tasksObj[todolistId];
    const updateTasks = tasks.map((task) => {
      if (task.id === taskId) return { ...task, title: title };
      return task;
    });
    tasksObj[todolistId] = updateTasks;

    setTasks({ ...tasksObj });
  }
  function changeTodolistTitle(todolistId: string, title: string) {
    const todolist = todolists.find((todolist) => todolist.id === todolistId);
    if (todolist) {
      todolist.title = title;
      setTodolists([...todolists]);
    }
  }

  function removeTask(id: string, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const filteredTasks = tasks.filter((task) => task.id !== id);
    tasksObj[todolistId] = filteredTasks;

    setTasks({ ...tasksObj });
  }
  function addTask(inputValue: string, todolistId: string) {
    const tasks = tasksObj[todolistId];
    const newTask = {
      id: uuidv4(),
      title: inputValue,
      isDone: false,
    };

    const newTasks = [newTask, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
    inputValue = '';
  }

  const removeTodolist = (todolistId: string) => {
    const filteredTodolists = todolists.filter(
      (todolist) => todolist.id !== todolistId
    );
    setTodolists(filteredTodolists);
  };

  function addTodolist(title: string) {
    const todolist: TodolistType = {
      id: uuidv4(),
      filter: 'All',
      title: title,
    };
    setTodolists([todolist, ...todolists]);
    setTasks({ ...tasksObj, [todolist.id]: [] });
  }

  return (
    <div className="container">
      <div className="container__input">
        <TodolistInput addItem={addTodolist} />
      </div>

      <div className="todolists__container">
        {todolists.map((todolist) => {
          let tasksForTodoList = tasksObj[todolist.id];

          if (todolist.filter === 'Completed') {
            tasksForTodoList = tasksForTodoList.filter((task) => task.isDone);
          } else if (todolist.filter === 'Active') {
            tasksForTodoList = tasksForTodoList.filter((task) => !task.isDone);
          }
          return (
            <Todolist
              id={todolist.id}
              key={todolist.id}
              title={todolist.title}
              tasks={tasksForTodoList}
              removeTask={removeTask}
              filteredTasks={filteredTasks}
              addTask={addTask}
              filter={todolist.filter}
              changeTaskStatus={changeTaskStatus}
              changeTaskTitle={changeTaskTitle}
              removeTodolist={removeTodolist}
              changeTodolistTitle={changeTodolistTitle}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;