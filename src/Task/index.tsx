
import { TaskType } from '../Todolist';
import EditableSpan from '../EditableSpan';

type TaskPropsType = {
  task: TaskType;
  todolistId: string;
  removeTask: (taskId: string, todolistId: string) => void;
  changeTaskStatus: (taskId: string, todolistId: string) => void;
  changeTaskTitle: (taskId: string, todolistId: string, title: string) => void;
};

const Task = (props: TaskPropsType) => {
  const removeTask = () => props.removeTask(props.task.id, props.todolistId);
  const changeTaskStatus = () =>
    props.changeTaskStatus(props.task.id, props.todolistId);

  const changeTaskTitle = (title: string) => {
    props.changeTaskTitle(props.task.id, props.todolistId, title);
  };

  return (
    <>
      <li key={props.task.id} className={`flex justify-between pl-2 ${props.task.isDone ? 'opacity-[0.5] bg-violet-400' : ''}`}>
        <input
          type="checkbox"
          checked={props.task.isDone}
          onChange={changeTaskStatus}
        />
        <EditableSpan
          title={props.task.title}
          removeTask={removeTask}
          onChange={changeTaskTitle}
        />
      </li>
    </>
  );
};

export default Task;
