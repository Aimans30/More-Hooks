import React, { useReducer, useRef } from 'react';
import './App.css';

const initialState = {
  tasks: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'TOGGLE_TASK':
      const updatedTasks = state.tasks.map((task, index) =>
        index === action.payload ? { ...task, hidden: !task.hidden } : task
      );
      return { ...state, tasks: updatedTasks };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const inputRef = useRef(null);

  const handleAddTask = (e) => {
    e.preventDefault();
    const taskText = inputRef.current.value.trim();
    if (taskText.length > 0) {
      dispatch({ type: 'ADD_TASK', payload: { text: taskText, hidden: false } });
      inputRef.current.value = '';
      inputRef.current.focus();
    }
  };

  const handleToggleTask = (index) => {
    dispatch({ type: 'TOGGLE_TASK', payload: index });
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    inputRef.current.focus(); // Transfer focus back to the input box
  };

  return (
    <div className="app">
      <form onSubmit={handleAddTask}>
        <input type="text" placeholder="Add a task" ref={inputRef} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {state.tasks.map((task, index) => (
          <li key={index}>
            {task.hidden && <span>This content is hidden.</span>}
            {!task.hidden && <span>{task.text}</span>}
            <button onClick={() => handleToggleTask(index)}>
              Toggle
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleScrollToTop}>Scroll to Top</button>
    </div>
  );
};

export default App;
