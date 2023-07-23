import { FilterValuesType } from './App';
import EditableSpan from './EditableSpan';
import TodolistInput from './TodolistInput';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  filter: string;
  tasks: Array<TaskType>;
  removeTask: (taskId: string, todolistId: string) => void;
  filteredTasks: (value: FilterValuesType, todolistId: string) => void;
  addTask: (inputValue: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, todolistId: string) => void;
  removeTodolist: (todolistId: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
  changeTaskTitle: (taskId: string, todolistId: string, title: string) => void;
};
function Todolist(props: PropsType) {
  const filteredTasksAll = () => props.filteredTasks('All', props.id);
  const filteredTasksCompleted = () =>
    props.filteredTasks('Completed', props.id);
  const filteredTasksActive = () => props.filteredTasks('Active', props.id);

  const removeTodolist = () => {
    props.removeTodolist(props.id);
  };

  const addTask = (title: string) => {
    props.addTask(title, props.id);
  };

  const changeTodolistTitle = (title: string) => {
    props.changeTodolistTitle(props.id, title);
  };

  return (
    <div>
      <h1>
        <EditableSpan title={props.title} onChange={changeTodolistTitle} />
        <button onClick={removeTodolist}>x</button>
      </h1>
      <div>
        <TodolistInput addItem={addTask} />
      </div>
      <ul>
        {props.tasks.length > 0
          ? props.tasks.map((task) => {
              const removeTask = () => props.removeTask(task.id, props.id);
              const changeTaskStatus = () =>
                props.changeTaskStatus(task.id, props.id);

              const changeTaskTitle = (title: string) => {
                props.changeTaskTitle(task.id, props.id, title);
              };
              return (
                <li key={task.id}>
                  <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatus}
                  />
                  <EditableSpan title={task.title} onChange={changeTaskTitle} />
                  <button>edit</button>
                  <button onClick={removeTask}>x</button>
                </li>
              );
            })
          : `${props.filter} Tasks was deleted :(`}
      </ul>
      <div>
        <button
          className={props.filter === 'All' ? 'filter-active' : ''}
          onClick={filteredTasksAll}
        >
          All
        </button>
        <button
          className={props.filter === 'Active' ? 'filter-active' : ''}
          onClick={filteredTasksActive}
        >
          Active
        </button>
        <button
          className={props.filter === 'Completed' ? 'filter-active' : ''}
          onClick={filteredTasksCompleted}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default Todolist;