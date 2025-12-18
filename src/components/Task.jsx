
import PropTypes from 'prop-types';

import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, setComplete, onDelete }) => {
  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => setComplete && setComplete(id)}
      >
        {props.title}
      </button>
      <button className="tasks__item__remove button"
        onClick={() => onDelete && onDelete(id)}
      >
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  setComplete: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Task;
