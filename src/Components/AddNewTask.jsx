import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TasksContext } from '../Context/TaskContext';
import { v4 as uuidv4 } from 'uuid'; //This dependency lets us create a unique ID

function AddNewTask() {
    //Importing the context api from TaskContext.jsx
    const {tasks, addTask} = useContext(TasksContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");    

    function handleTitleChange(e){
        setTitle(e.target.value);
    }

    function handleDescriptionChange(e){
        setDescription(e.target.value);
    }

    function handleDateChange(e){
        setDueDate(e.target.value);
    }

    //Converts the given string date in 'yyyy-mm-dd' format
    function formatDate(dateString) {
        const dateParts = dateString.split('-');
        return `${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`; 
    }


    //Using useNavigate() hook allows us to navigate to homepage after the task is added 
    const navigate = useNavigate();

    //Handles form submission
    function handleSubmit(e) {
        e.preventDefault();

        if (!title || !description || !dueDate) {
            alert("Please fill in all required fields.");
            return;
        }
        const formattedDueDate = formatDate(dueDate);

        const newTask = {
            id: uuidv4(),
            title: title,
            description: description,
            dueDate: formattedDueDate
        };
        addTask(newTask);
        navigate('/');  // Redirect to home after task is added
    }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-10 sm:mt-16">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-3xl">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Title</label>
                <input
                    name='title'
                    type="text"
                    placeholder='Title'
                    value={title}
                    onChange={handleTitleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                    name="description"
                    id="description"
                    rows="5"
                    placeholder='Description'
                    value={description}
                    onChange={handleDescriptionChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                ></textarea>
            </div>

            <div>
                <label htmlFor="dueDate" className="block text-gray-700 font-semibold mb-2">Due Date</label>
                <input
                    name='dueDate'
                    type="date"
                    value={dueDate}
                    onChange={handleDateChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
                />
            </div>

            <div className="flex justify-center">
                <button
                    type="submit"
                    className="bg-indigo-600 text-white font-semibold px-6 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm sm:text-base"
                >
                    Add Task
                </button>
            </div>
        </form>
    </div>
  )
}

export default AddNewTask