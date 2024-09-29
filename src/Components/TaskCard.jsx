import React, { useContext, useState } from 'react';
import { TasksContext } from '../Context/TaskContext';

function TaskCard({ task }) {
    const [isComplete, setIsComplete] = useState(false);
    const { deleteTask } = useContext(TasksContext);

    function handleToggleComplete() {
        setIsComplete(!isComplete);
    }

    function handleDelete() {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            deleteTask(task); 
        }
    }

    return (
        <section 
            className={`flex p-4 mb-4 bg-white border-2 rounded-lg shadow-md transition-all duration-300 ${isComplete ? 'bg-[#5df392] border-[#41cb71]' : 'border-gray-300'}`} 
        >
            <div className='flex-1 pr-4'>
                <h1 className={`text-lg font-semibold ${isComplete ? 'line-through ' : 'text-gray-800'}`}>Title: {task.title}</h1>
                <p className={`text-gray-700 ${isComplete ? 'line-through' : ''}`}>Description: {task.description}</p>
                <div className={`text-gray-600 ${isComplete ? 'line-through ' : ''}`}>Due Date: {task.dueDate}</div>
                <div className={`text-gray-600 ${isComplete ? 'line-through ' : ''}`}>Created Date: {task.createdDate}</div>
                <div className={`text-gray-600 ${isComplete ? 'line-through ' : ''}`}>Updated Date: {task.updatedDate}</div>
            </div>
            <div className="flex flex-col justify-center ml-4">
                <button 
                    onClick={handleToggleComplete} 
                    className={`font-semibold px-4 py-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isComplete ? 'bg-gray-400 text-white' : 'bg-green-500 text-white hover:bg-green-600'}`}
                >
                    {isComplete ? 'Mark as Incomplete' : 'Mark as Complete'}
                </button>
                <button 
                    onClick={handleDelete} 
                    className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-offset-2 transition duration-200 mt-2"
                >
                    Delete Task
                </button>
            </div>
        </section>
    );
}

export default TaskCard;
