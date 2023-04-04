import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {FilterValueType} from "../App";

type TaskType = {
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
}

export const Todolist: FC<TodolistPropsType> = ({
                                                  title,
                                                  tasks,
                                                  removeTask,
                                                  changeFilter,
                                                  addTask,
                                                  changeTaskStatus,
                                                  filter,
                                                  todoId
                                                }) => {

  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const createTask = () => {
    if (taskTitle.trim() !== '') {
      addTask(taskTitle.trim(), todoId)
      setTaskTitle('')
    } else {
      setError('Title is required')
    }
  }


  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      createTask()
    }
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

  return <div>
    <h3>{title}</h3>
    <div>
      <input
          value={taskTitle}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressHandler}
          className={error ? 'error' : ''}/>
      <button onClick={createTask}>+</button>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
    <ul>{tasks.map(task => {

      const checkBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue, todoId)
      }
      return (
          <li key={task.id}><input type='checkbox' checked={task.isDone} onChange={checkBoxHandler}
                                   className={task.isDone ? 'isDone' : ''}/>
            <span>{task.title}</span>
            <button onClick={() => removeTask(task.id, todoId)}>✖️</button>
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

