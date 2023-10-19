import React, { useState, useContext } from 'react';
import { TaskContext } from '../TaskContext';

function TaskItem({ task }) {
  const [tasks, setTasks] = useContext(TaskContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const toggleCompletion = () => {
    setTasks(tasks.map(t => {
      if (t.id === task.id) {
        return { ...t, completed: !t.completed };
      }
      return t;
    }));
  };

  const saveEdit = () => {
    setTasks(tasks.map(t => {
      if (t.id === task.id) {
        return { ...t, title: editedTitle };
      }
      return t;
    }));
    setIsEditing(false);
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={task.completed} onChange={toggleCompletion} />
      
      {
        isEditing ? 
        <input 
          type="text" 
          value={editedTitle} 
          onChange={e => setEditedTitle(e.target.value)}
          onBlur={saveEdit}
          onKeyPress={event => {
            if (event.key === "Enter") {
              saveEdit();
            }
          }}
        /> 
        : 
        <span onDoubleClick={() => setIsEditing(true)}>
          {task.title}
        </span>
      }
    </div>
  );
}

export default TaskItem;
