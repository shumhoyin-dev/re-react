import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useAuth} from './context/useAuth'
import { useForm } from "react-hook-form";
import TodoTable from './TodoTable';

function Todo() {
    const user = useAuth();
    const [todoList, setTodoList] = useState([]);


    const getTodoList = async()=>{
        try {
            const data = await axios.get('https://todoo.5xcamp.us/todos');
            setTodoList(data.data.todos)
          } catch (error) {
            console.log(error)
          }
    }


    useEffect(()=>{
        getTodoList();      
    },[])



    const signOut = () =>{
        user.logout();
    }

  return (
    <div id="todoListPage" className="bg-half">
        <nav>
            <h1><a href="#">ONLINE TODO LIST</a></h1>

            <div>
                <strong>{user.user.nickname}</strong>
                <button type='button' onClick={signOut}>登出</button>
            </div>
        </nav>


      

            <TodoTable todoList={todoList} setTodoList={setTodoList}  />
         
    </div>
  )
}

export default Todo