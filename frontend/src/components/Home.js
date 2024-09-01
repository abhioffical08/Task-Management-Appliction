import React, { useState,useEffect } from 'react';
import './Style/Home.css'; // Make sure this path is correct

function Home() {
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


  useEffect(() => {
    const body = document.querySelector('body');
    const sidebar = body.querySelector('nav');
    const toggle = body.querySelector(".toggle");
    const searchBtn = body.querySelector(".search-box");
    const modeSwitch = body.querySelector(".toggle-switch");
    const modeText = body.querySelector(".mode-text");

    const handleToggleClick = () => {
      sidebar.classList.toggle("close");
    };

    const handleSearchClick = () => {
      sidebar.classList.remove("close");
    };

    const handleModeSwitchClick = () => {
      body.classList.toggle("dark");

      if (body.classList.contains("dark")) {
        modeText.innerText = "Light mode";
      } else {
        modeText.innerText = "Dark mode";
      }
    };

    toggle.addEventListener("click", handleToggleClick);
    searchBtn.addEventListener("click", handleSearchClick);
    modeSwitch.addEventListener("click", handleModeSwitchClick);

    // Cleanup the event listeners on component unmount
    return () => {
      toggle.removeEventListener("click", handleToggleClick);
      searchBtn.removeEventListener("click", handleSearchClick);
      modeSwitch.removeEventListener("click", handleModeSwitchClick);
    };
  }, []);

  return (
    <>
      <nav className="sidebar close">
        {/* HeadLine-Logo================ */}
        <header>
          <div className="image-text">
            <span className="image">
              <img src="AvLogo.png" alt="Logo"/>
            </span>

            <div className="text logo-text">
              <span className="name">AV</span>
              <span className="profession">React-Js developer</span>
            </div>
          </div>

          <i className='bx bx-chevron-right toggle'></i>
        </header>
        {/* Manu-Bar================= */}
        <div className="menu-bar">
          <div className="menu">
            <li className="search-box">
              <i className='bx bx-search icon'></i>
              <input type="text" placeholder="Search..."/>
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <a href="#">
                  <i className='bx bx-bar-chart-alt-2 icon'></i>
                  <span className="text nav-text">Achievement</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <i className='bx bx-bell icon'></i>
                  <span className="text nav-text">Notifications</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            <li>
              <a href="/login">
                <i className='bx bx-log-out icon'></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li>

            <li className="mode">
              <div className="sun-moon">
                <i className='bx bx-moon icon moon'></i>
                <i className='bx bx-sun icon sun'></i>
              </div>
              <span className="mode-text text">Dark mode</span>

              <div className="toggle-switch">
                <span className="switch"></span>
              </div>
            </li>
          </div>
        </div>
      </nav>

      {/* *********************** Task*********************** */}
      
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
        
        <button type="submit" className='btn'>{editingTaskId ? 'Update Task' : 'Add Task'}</button>
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
              <button className='btn' onClick={() => deleteTask(task.id)}>Delete</button>
              <button className='btn' onClick={() => startEditTask(task.id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>

    </>
  );
}

export default Home;
