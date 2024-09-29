import React, { createContext, useState } from 'react';

export const TasksContext = createContext();
export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    const addTask = (task) =>{
        const date = new Date();

        let day = date.getDate();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        setTasks(tasks => {
            const newTask = {
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
                createdDate: currentDate,
                updatedDate: currentDate
            }
            return [...tasks, newTask];
        })
    }

    const deleteTask = (task) => {
        const updatedTasks = tasks.filter(givenTask => {
            return givenTask.title !== task.title;
        })
        setTasks(updatedTasks);
    }

    const deleteAllTasks = () => {
        setTasks([]);
    }

    return (
        <TasksContext.Provider
            value={{
                tasks,
                addTask,
                deleteTask,
                deleteAllTasks
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}