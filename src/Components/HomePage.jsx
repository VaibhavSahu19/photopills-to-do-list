import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import { TasksContext } from '../Context/TaskContext';

function HomePage() {
    const { tasks, deleteAllTasks } = useContext(TasksContext);

    const tasksList = tasks.map((task, index) => {
        return <TaskCard key={index} task={task} />;
    });

    return (
        <section className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Your Tasks</h1>
            <div className="flex flex-col space-y-4 mb-6">
                {tasks.length > 0 ? tasksList : <p className="text-center text-gray-500">No tasks available. Please add a task!</p>}
            </div>
            <div className="flex justify-between items-center">
                <Link 
                    to='/addTask' 
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
                >
                    Add New Task
                </Link>
                <button 
                    onClick={deleteAllTasks} 
                    className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2"
                >
                    Delete All Tasks
                </button>
            </div>
        </section>
    );
}

export default HomePage;
