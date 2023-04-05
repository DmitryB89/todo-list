import React, {ChangeEvent, FC, useState} from 'react';

type SpanPropsType = {
  value: string
}

export const EditableSpan: FC<SpanPropsType> = ({value}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [title, setTitle] = useState(value)
  const enterEditMode = () => {
    setEditMode(true)
    setTitle(value)
  }

  const  quitEditMode= () => {
    setEditMode(false)


  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }
  return editMode
      ? <input value={title} onChange={onChangeHandler} autoFocus onBlur={quitEditMode}/>
      : <span onDoubleClick={enterEditMode}>{value}</span>
}

