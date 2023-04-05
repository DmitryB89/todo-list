import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemPropsType = {
  addItem: (title:string ) => void
}


export const AddItemForm:FC<AddItemPropsType> = ({addItem}) => {
  const [title, setTitle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const createItem = () => {
    if (title.trim() !== '') {
      addItem(title.trim())
      setTitle('')
    } else {
      setError('Title is required')
    }
  }


  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      createItem()
    }
  }


  return (
      <div>
        <div>
          <input
              value={title}
              onChange={onChangeHandler}
              onKeyPress={onKeyPressHandler}
              className={error ? 'error' : ''}/>
          <button onClick={createItem}>+</button>
          {error && <div className={'error-message'}>{error}</div>}
        </div>
      </div>
  );
};
