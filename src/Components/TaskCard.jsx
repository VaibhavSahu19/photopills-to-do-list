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

    // Function to get today's date in "dd-mm-yyyy" format
    const getFormattedToday = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Determine background color based on task status
    const getBackgroundColor = () => {
        const formattedToday = getFormattedToday();
        let bgColor = 'bg-white';

        if (isComplete) {
            bgColor = 'bg-[#5df392]'; // Completed task color
        } else if (task.dueDate === formattedToday) {
            bgColor = 'bg-orange-400 border-orange-500'; // Today's task color
        } else {
            const dueDateParts = task.dueDate.split('-');
            const dueDate = new Date(`${dueDateParts[2]}-${dueDateParts[1]}-${dueDateParts[0]}`); // Convert to Date object
            const today = new Date(); // Today's date for comparison

            // Set the time to midnight to avoid time zone issues
            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);
            
            if (dueDate < today) {
                bgColor = 'bg-red-400 border-red-500'; // Past task color
            } else {
                bgColor = 'bg-[#616161] text-white border-black'; // Future task color
            }
        }

        return bgColor;
    };

    return (
        <section 
            className={`flex flex-col md:flex-row p-4 border-2 rounded-lg shadow-md transition-all duration-300 ${getBackgroundColor()}`} 
        >
            <div className='flex-1 pr-4'>
                <h1 className={`text-lg font-semibold ${isComplete ? 'line-through' : ''}`}>Title: {task.title}</h1>
                <p className={` ${isComplete ? 'line-through' : ''}`}>Description: {task.description}</p>
                <div className={` ${isComplete ? 'line-through' : ''}`}>Due Date: {task.dueDate}</div>
                <div className={` ${isComplete ? 'line-through' : ''}`}>Created Date: {task.createdDate}</div>
                <div className={` ${isComplete ? 'line-through' : ''}`}>Updated Date: {task.updatedDate}</div>
            </div>
            <div className="flex flex-col justify-center mt-4 md:ml-4">
                <button 
                    onClick={handleToggleComplete} 
                    className={`font-semibold px-4 py-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isComplete ? 'bg-gray-400 text-white' : 'bg-green-600 text-white hover:bg-green-700'}`}
                >
                    {isComplete ? 'Mark as Incomplete' : 'Mark as Complete'}
                </button>
                <button 
                    onClick={handleDelete} 
                    className="bg-red-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-200 mt-2"
                >
                    Delete Task
                </button>
            </div>
        </section>
    );
}

export default TaskCard;
