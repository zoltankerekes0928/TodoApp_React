import React from 'react'
import "./styles.css" 
import { Todo } from "../model"
import SingleTodo from './SingleTodo';
import { Droppable } from 'react-beautiful-dnd';


interface Props{
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTasks: Todo[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList:React.FC<Props> = ({todos, setTodos, completedTasks, setCompletedTasks}) => {
  return (
    <div className="container">
      <Droppable droppableId='TodoList'>
       {(provider)=>(
        <div className="todos" ref={provider.innerRef} {...provider.droppableProps}>
          <span className='todos__heading'>Active Todo</span>
          {todos.map((todo, index)=>{
            return(
              <SingleTodo 
                index={index}
                todo={todo} 
                key={todo.id} 
                todos={todos} 
                setTodos={setTodos}/>
            )
          })}
          {provider.placeholder}
        </div>)}
      </Droppable>

      <Droppable droppableId='TodoListRemove'>
        {(provider)=>(
          <div className="todos" ref={provider.innerRef} {...provider.droppableProps}>
            <span className='todos__heading'>Completed Todo</span>
            {completedTasks.map((todo, index)=>{
              return(
                <SingleTodo 
                  index={index}
                  todo={todo} 
                  key={todo.id} 
                  todos={completedTasks} 
                  setTodos={setCompletedTasks}/>
              )
          })}
          {provider.placeholder}
        </div>)}
      </Droppable>
    </div>
  )
}


export default TodoList