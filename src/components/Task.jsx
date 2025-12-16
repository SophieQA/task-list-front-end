
import PropTypes from 'prop-types';
import './Task.css';

const Task = (props) => {
  const taskCompleteClicked = () => {
    props.onCompleteToggle(props.id);
  };
  const taskDeleteClicked = () => {
    props.onDelete(props.id);
  };

  const buttonClass = props.isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={taskCompleteClicked}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button"
        onClick={taskDeleteClicked}
      >x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onCompleteToggle: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Task;
