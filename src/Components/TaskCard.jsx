import React, { useContext, useState, useEffect } from 'react';
import { TasksContext } from '../Context/TaskContext';
import { Link } from 'react-router-dom';

function TaskCard({ task }) {
    const [isComplete, setIsComplete] = useState(false);
    const [bgColor, setBgColor] = useState('bg-white'); // Initialize background color state
    const { deleteTask } = useContext(TasksContext);

    // Toggle task completion status
    function handleToggleComplete() {
        setIsComplete(!isComplete);
    }

    // Delete task with confirmation
    function handleDelete() {
        const confirmDelete = window.confirm("Are you sure you want to delete this task?");
        if (confirmDelete) {
            deleteTask(task);
        }
    }

    // Format today's date as "dd-mm-yyyy"
    const getFormattedToday = () => {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        // Adds a leading zero in front of month if it is less than 10
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const year = today.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Function to format a date string from "yyyy-mm-dd" to "dd-mm-yyyy"
    const formatDateToDDMMYYYY = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
    };

    // Convert date from "dd-mm-yyyy" to a Date object
    const parseDateFromDDMMYYYY = (dateStr) => {
        const [day, month, year] = dateStr.split('-');
        return new Date(`${year}-${month}-${day}`);
    };

    // Function to determine background color based on task status and due date
    const determineBackgroundColor = () => {
        const formattedToday = getFormattedToday();
        const formattedDueDate = formatDateToDDMMYYYY(task.dueDate); // Ensure `dueDate` is in dd-mm-yyyy format
        let newBgColor = 'bg-white';

        if (isComplete) {
            newBgColor = 'bg-[#5df392]'; // Completed task color
        } else if (formattedDueDate === formattedToday) {
            newBgColor = 'bg-orange-400 border-orange-500'; // Today's task color
        } else {
            const dueDateObj = parseDateFromDDMMYYYY(formattedDueDate);
            const todayObj = parseDateFromDDMMYYYY(formattedToday);

            if (dueDateObj < todayObj) {
                newBgColor = 'bg-red-400 border-red-500'; // Past task color
            } else {
                newBgColor = 'bg-[#616161] text-white border-black'; // Future task color
            }
        }

        return newBgColor;
    };

    // useEffect to recalculate the background color when the task or its dueDate changes
    useEffect(() => {
        const newBgColor = determineBackgroundColor();
        setBgColor(newBgColor); // Update the background color state
    }, [task.dueDate, isComplete]); // Re-run when dueDate or completion status changes

    return (
        <section 
            className={`flex flex-col md:flex-row p-4 border-2 rounded-lg shadow-md transition-all duration-300 ${bgColor}`} 
        >
            <div className='flex flex-col justify-center flex-1 pr-4'>
                <h1 className={`text-lg font-semibold ${isComplete ? 'line-through' : ''}`}>Title: {task.title}</h1>
                <p className={` ${isComplete ? 'line-through' : ''}`}>Description: {task.description}</p>
                <div className={` ${isComplete ? 'line-through' : ''}`}>Due Date: {formatDateToDDMMYYYY(task.dueDate)}</div>
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
                <Link 
                    to='/editTask'
                    state={{ task }}
                    className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-offset-0 transition duration-200 mt-2 text-center"
                >
                    Edit Task
                </Link>
            </div>
        </section>
    );
}

export default TaskCard;
