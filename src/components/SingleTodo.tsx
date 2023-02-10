import { Todo } from '../model'
import React, { useEffect, useRef, useState } from 'react'
import { AiFillEdit, AiFillDelete, AiOutlineFileDone } from 'react-icons/ai'
import "./styles.css"
import { Draggable } from 'react-beautiful-dnd'


interface Props{ 
  index: number,
  todo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}


const SingleTodo:React.FC<Props> = ({index, todo, todos, setTodos}) => {

  const [edit, setEdit] = useState<boolean>(false)  
  const inputRef = useRef<HTMLInputElement>(null)

  const handleEdit = ()=>{
    setEdit(!edit)
  }

  const handleEditTodo = (e:any , id:number)=>{
    e.preventDefault()
    setTodos(todos.map((task)=> task.id === id ? {...task, todo: e.target.value }: task))
  }

  const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault()
    setEdit(false)
  }

  const handleDelete = (id:number)=>{
    setTodos(todos.filter((task)=>task.id !== id))
  }

  const handleDone=(id:number)=>{
   setTodos(todos.map((task)=> task.id === id ? {...task, isDone: !task.isDone} : task))
  }

  useEffect(()=>{
    inputRef.current?.focus()
  }, [edit])
 
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided)=>(

   <form className="todos__single"
    onSubmit={(e)=>handleSubmit(e)}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    ref={provided.innerRef}
    >
    {(edit && !todo.isDone) ?
      <input type="text" className='todos__single--edited' value={todo.todo}  onChange={(e)=>handleEditTodo(e, todo.id)} ref={inputRef}/> 
        :
      <span className={`todos__single--text${todo.isDone ? "--done" : "" }`}>{todo.todo}</span>
    }

    <div className='icons'>
      <span className="icons__icon">
        <AiFillEdit onClick={()=>handleEdit()} />
      </span>
       <span className="icons__icon">
        <AiFillDelete  onClick={()=>handleDelete(todo.id)}/>
      </span>
       <span className="icons__icon">
        <AiOutlineFileDone onClick={()=>handleDone(todo.id)}/>
      </span>
    </div>
   </form>
      )

      }
   </Draggable>
  )
}

export default SingleTodo