import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";


export type FilterValueType = 'All' | 'Active' | 'Completed'
export type TodolistsType = {
  id: string
  title: string
  filter: FilterValueType
}


function App() {
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'All'},
    {id: todolistID2, title: 'What to buy', filter: 'All'},
  ])

  let [tasks, setTasks] = useState({
    [todolistID1]: [
      {id: v1(), title: 'HTML&CSS', isDone: true},
      {id: v1(), title: 'JS', isDone: true},
      {id: v1(), title: 'ReactJS', isDone: false},

    ],
    [todolistID2]: [
      {id: v1(), title: 'Rest API', isDone: true},
      {id: v1(), title: 'GraphQL', isDone: false},
    ]
  })


  const addTask = (taskTitle: string, todolistId: string) => {
    let task = {id: v1(), title: taskTitle, isDone: false}
    let todolistTasks = tasks[todolistId]
    tasks[todolistId] = [task, ...todolistTasks]
    setTasks({...tasks})
  }

  const changeFilter = (value: FilterValueType, todolistId: string) => {
    let todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  const removeTask = (id: string, todolistId: string) => {
    let todolistTasks = tasks[todolistId]
    tasks[todolistId] = todolistTasks.filter(task => task.id !== id)

    setTasks({...tasks})
  }
  const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {
    let todolistTasks = tasks[todolistId]

    let task = todolistTasks.find(task => task.id === id)
    if (task) {
      task.isDone = isDone
    }
    setTasks({...tasks})
  }

  return (
      <div className='App'>{todolists.map(tl => {
        let allTasksForTodolist = tasks[tl.id]
        let tasksForTodolist = allTasksForTodolist
        if (tl.filter === 'Active') {
          tasksForTodolist = allTasksForTodolist.filter(tasks => !tasks.isDone)
        }

        if (tl.filter === 'Completed') {
          tasksForTodolist = allTasksForTodolist.filter(tasks => tasks.isDone)
        }
        return <Todolist key={tl.id} title='What to learn' tasks={tasksForTodolist} removeTask={removeTask}
                         changeFilter={changeFilter}
                         addTask={addTask} changeTaskStatus={changeTaskStatus} filter={tl.filter} todoId={tl.id}/>
      })}

      </div>
  );
}

export default App;
