import React, { useState } from 'react';
import './index.css';
import Header from './components/Header';
import TaskList from './components/TaskList';

function App() {
  const initialTasks = [];

  const [tasks, setTasks] = useState(initialTasks);
  const [newTask, setNewTask] = useState(''); // Estado para la nueva tarea
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTaskName, setEditedTaskName] = useState('');



  const handleTaskChange = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: tasks.length + 1,
        name: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask('');
    }
  };

  const handleClearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  }
  
  
  const pendingTasksCount = tasks.filter((task) => !task.completed).length;

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    setEditingTaskId(taskId);
    setEditedTaskName(taskToEdit.name);
  };

  const handleSaveEditedTask = (newEditedTaskName) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === editingTaskId
          ? { ...task, name: newEditedTaskName }
          : task
      )
    );
    setEditingTaskId(null);
    updateEditedTaskName(newEditedTaskName);
    console.log("editedTaskName:", editedTaskName);
  };
  

  const updateEditedTaskName = (newEditedTaskName) => {
    setEditedTaskName(newEditedTaskName);
  };
  

  return (
    <div className="App">
      <Header />
      <div className="task-bard">
        <input
          type="text"
          placeholder="Enter a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button type='button' id='botonMas' onClick={handleAddTask}>+</button>
      </div>
      <TaskList 
      tasks={tasks} 
      onTaskChange={handleTaskChange} 
      onEditTask={handleEditTask}
      editingTaskId={editingTaskId}
      editedTaskName={editedTaskName}
      onSaveEditedTask={handleSaveEditedTask}
      updateEditedTaskName={updateEditedTaskName}
      />
      <div className="task-count">Tareas Pendientes: {pendingTasksCount}</div>
      <button type='button' id='clear' onClick={handleClearCompleted}>Clear</button>
      
    </div>
  );
}

export default App;
