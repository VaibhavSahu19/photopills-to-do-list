import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TasksContext } from '../Context/TaskContext';

const formatDate = (dateString) => {
  const [day, month, year] = dateString.split('-');
  return `${year}-${month}-${day}`;  // Convert to YYYY-MM-DD format
};

const EditTask = () => {
    const location = useLocation();
    const { task } = location.state;

    const { tasks, setTasks } = useContext(TasksContext);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [dueDate, setDueDate] = useState(formatDate(formatDate(task.dueDate)));    

    const navigate = useNavigate();

    function handleTitleChange(e) {
        setTitle(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleDateChange(e) {
        setDueDate(e.target.value);
    }

    const getCurrentDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');  
        const month = String(date.getMonth() + 1).padStart(2, '0');  
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;  
    };

    //Instead of adding a new task, this handle function edits a particular task with a particular unique ID
    function handleSubmit(e) {
        e.preventDefault();

        if (!title || !description || !dueDate) {
            alert("Please fill in all required fields.");
            return;
        }

        const updatedTask = { 
            ...task, 
            title, 
            description, 
            dueDate, 
            updatedDate: getCurrentDate()  
        };

        const updatedTasks = tasks.map(t => 
            t.id === task.id ? updatedTask : t  
        );

        setTasks(updatedTasks);
        navigate('/');  
    }

    return (
        <section className="max-w-lg mx-auto p-6 bg-gray-50 rounded-lg shadow-md mt-8">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Update Your Task</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-gray-600 font-medium mb-1">Title</label>
                    <input
                        name='title'
                        type="text"
                        placeholder='Enter task title'
                        value={title}
                        onChange={handleTitleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-gray-600 font-medium mb-1">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        rows="5"
                        placeholder='Enter task description'
                        value={description}
                        onChange={handleDescriptionChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
                    ></textarea>
                </div>

                <div>
                    <label htmlFor="dueDate" className="block text-gray-600 font-medium mb-1">Due Date</label>
                    <input
                        name='dueDate'
                        type="date"
                        value={dueDate}
                        onChange={handleDateChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm sm:text-base"
                    />
                </div>

                <div className="flex justify-center">
                    <button
                        type="submit"
                        className="bg-indigo-500 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 text-sm sm:text-base transition duration-200"
                    >
                        Update Task
                    </button>
                </div>
            </form>
        </section>
    );
};

export default EditTask;
