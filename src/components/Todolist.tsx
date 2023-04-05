import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValueType, TodolistsType} from "../App";
import {AddItemForm} from "./AddItemForm";
import {v1} from "uuid";
import {EditableSpan} from "./EditableSpan";

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

type TodolistPropsType = {
  title: string
  tasks: TaskType[]
  removeTask: (id: string, todolistId: string) => void
  changeFilter: (value: FilterValueType, todolistId: string) => void
  addTask: (taskTitle: string, todolistId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
  filter: string
  todoId: string
  removeTodolist: (todolistId: string) => void
}

export const Todolist: FC<TodolistPropsType> = ({
                                                  title,
                                                  tasks,
                                                  removeTask,
                                                  changeFilter,
                                                  addTask,
                                                  changeTaskStatus,
                                                  filter,
                                                  todoId,
                                                  removeTodolist
                                                }) => {


const createTask = (taskTitle: string) => {
  addTask(taskTitle,todoId)
}
  const changeFilterAll = () => {
    changeFilter('All', todoId)
  }

  const changeFilterActive = () => {
    changeFilter('Active', todoId)

  }
  const changeFilterCompleted = () => {
    changeFilter('Completed', todoId)
  }

const deleteTodolist= () => {
  removeTodolist(todoId)
  }

  const changeTodolistTitle = (title:string) => {

  }

  return <div>
    <h3>{title}</h3>
    <button onClick={deleteTodolist}>✖️</button>
    <AddItemForm addItem={createTask}/>
    <ul>{tasks.map(task => {

      const checkBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue, todoId)
      }
      const deleteTask = () => {
      removeTask(task.id, todoId)
      }
      return (
          <li key={task.id}><input type='checkbox' checked={task.isDone} onChange={checkBoxHandler}
                                   className={task.isDone ? 'isDone' : ''}/>
            <EditableSpan value ={task.title}/>
            <button onClick={deleteTask}>✖️</button>
          </li>)
    })}

    </ul>
    <div>
      <button onClick={changeFilterAll} className={filter === 'All' ? 'active-filter' : ''}>All</button>
      <button onClick={changeFilterActive} className={filter === 'Active' ? 'active-filter' : ''}>Active</button>
      <button onClick={changeFilterCompleted} className={filter === 'Completed' ? 'active-filter' : ''}>Completed
      </button>
    </div>
  </div>

};

