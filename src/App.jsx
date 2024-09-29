import { useContext, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import AddNewTask from './Components/AddNewTask'
import HomePage from './Components/HomePage'
import EditTask from './Components/EditTask'

function App() {

  return (
    <div className=''>
      <Routes>
        <Route path='/' element = {<HomePage />}></Route>
        <Route path='/addTask' element = {<AddNewTask />}></Route>
        <Route path='/editTask' element = {<EditTask />}></Route>
      </Routes>
    </div>
  )
}

export default App
