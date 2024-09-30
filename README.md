# To-Do List Application

This is a simple To-Do List web application built using **React + Vite**, designed to help users create, manage, and track their daily tasks efficiently.

## Features

- **Add Tasks**: Users can create new tasks with a title, description, due date.
- **Mark as Complete**: Mark tasks as completed, which visually strikes through the task and updates the status.
- **Delete Tasks**: Remove tasks from the list with a confirmation.
- **Edit Tasks**: Modify task details.
- **Due Date Handling**: Background color changes based on the task's due date:
  - Orange for tasks due today.
  - Red for overdue tasks.
  - Green for completed tasks.
  - Grey for future tasks.
- **Persistent Storage**: Tasks are saved in the browser's local storage, so they persist across sessions.

## Technologies Used

- **Vite**: For fast and efficient development.
- **React**: For building the UI components.
- **Tailwind CSS**: For styling.
- **React Router**: For handling navigation.
- **LocalStorage**: For saving tasks data.

## Live URL
- **https://vaibhav-sahu-to-do-list.vercel.app/**

## Installation

To get started with this project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/VaibhavSahu19/photopills-to-do-list.git
    cd photopills-to-do-list
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Run the development server:
    ```bash
    npm run dev
    ```

4. Open the application in your browser at:
    ```
    http://localhost:5173
    ```

## Scripts

- **npm run dev**: Runs the development server.
- **npm run build**: Builds the application for production.
- **npm run preview**: Previews the built app locally.

## Folder Structure

```plaintext
├── public/            # Static assets
├── src/
│   ├── components/    # Reusable components like TaskCard, AddNewTask, EditTask, HomePage
│   ├── context/       # Context provider for task management (TaskContext)
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Entry point for the React app
├── index.html         # Main HTML file
└── vite.config.js     # Vite configuration
