import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = (props) => {
  const getTaskListJSX = props.tasks.map(task => {
    return (
      <Task
        key={task.id}
        id={task.id}
        title={task.title}
        isComplete={task.isComplete}
        onCompleteToggle={props.onTaskCompleteToggle}
        onDelete={props.onDeleteTask}
      />

    );
  });

  return <ul className="tasks__list no-bullet">{getTaskListJSX}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onTaskCompleteToggle: PropTypes.func,
  onDeleteTask: PropTypes.func,
};

export default TaskList;
