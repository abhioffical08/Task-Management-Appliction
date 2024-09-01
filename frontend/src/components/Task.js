import React, { useState, useEffect } from 'react';
import './Style/Task.css';

const Task = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [error, setError] = useState({ title: false, description: false });

  useEffect(() => {
    if (editingTaskId) {
      const task = tasks.find(task => task.id === editingTaskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
      }
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
    }
  }, [editingTaskId, tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      setError({
        title: !title.trim(),
        description: !description.trim()
      });
      return;
    }

    const task = {
      id: editingTaskId || Date.now(),
      title,
      description,
      status
    };

    if (editingTaskId) {
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      setEditingTaskId(null);
    } else {
      setTasks([...tasks, task]);
    }
    
    setTitle('');
    setDescription('');
    setStatus('pending');
    setError({ title: false, description: false });
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const startEditTask = (taskId) => {
    setEditingTaskId(taskId);
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  return (
    <div className="container">
      <h1>Task Management Application</h1>
      <form id="task-form" onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {error.title && <span className="error-message">Title is required.</span>}
        
        <label htmlFor="description">Description:</label>
        <textarea 
          id="description" 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        {error.description && <span className="error-message">Description is required.</span>}
        
        <label htmlFor="status">Status:</label>
        <select 
          id="status" 
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        
        <button type="submit">{editingTaskId ? 'Update Task' : 'Add Task'}</button>
      </form>

      <div id="filter">
        <label htmlFor="filter-tasks">Filter:</label>
        <select id="filter-tasks" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div id="task-list">
        {filteredTasks.map(task => (
          <div key={task.id} className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <div className="task-actions">
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => startEditTask(task.id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task;
