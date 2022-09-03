import React, {useState} from 'react'
import { useForm } from "react-hook-form";
import ListItem from './ListItem';
import axios from 'axios';

function TodoTable({todoList ,setTodoList}) {
    const { register, handleSubmit, watch, reset,formState: { errors } } = useForm();
    const [options, setOptions] = useState('all')


    const clear = () =>{
        const tmp = [...todoList];
        const complete = tmp.filter((itm)=>{
            return itm.completed_at
         });

         if(complete.length === 0){
            alert("沒有已完成事項");
            return;
         }

        const pendingList = tmp.filter((itm)=>{
           return !itm.completed_at
        });

        setTodoList(pendingList);
        alert("已完成事項已被清除");
    }

    const filteredList = todoList.length > 0 ? todoList.filter((itm,idx)=>{
        switch(options){
            case "all":
                return itm
            case "pending":
                return !itm.completed_at
            case "complete":
                return itm.completed_at
            default:
                return itm
            }
    }) : [];

    const addTodo = async(data) => {
        try {
            const res = await axios.post('https://todoo.5xcamp.us/todos',{"todo":data});
            const prevTodo = [...todoList];
            prevTodo.push({...res.data,"completed_at":null})
            setTodoList(prevTodo)
            alert("新增成功")
            reset();
          } catch (error) {
            console.log(error)
          }
  
    }
    const removeTodo = async(id) => {
        try {
            const res = await axios.delete(`https://todoo.5xcamp.us/todos/${id}`);
            const prevTodo = [...todoList];
            const idx = prevTodo.findIndex((element,idx) => element.id === id);
            prevTodo.splice(idx,1)
            setTodoList(prevTodo)
            alert(res.data.message);
            
          } catch (error) {
            console.log(error)
          }
  
    }


    const toggleTodo = async(id) =>{
        try {
            const res = await axios.patch(`https://todoo.5xcamp.us/todos/${id}/toggle`);
            setTodoList(oldValue=>{
                const prevTodo = [...oldValue];
                const found = prevTodo.findIndex((element,idx) => element.id === id);
                prevTodo[found] = res.data
                return prevTodo
            });
            alert("狀態更改成功");

          } catch (error) {
            console.log(error)
          }

    }


    const editTodo = async(id , content) =>{
        try {
            const res = await axios.put(`https://todoo.5xcamp.us/todos/${id}`,{"todo":content});
            const prevTodo = [...todoList];
            const found = prevTodo.findIndex((element,idx) => element.id === id);
            const item = res.data;
            prevTodo[found] = {...prevTodo[found], ...item}
            setTodoList(prevTodo);
            alert("修改成功")
          } catch (error) {
            console.log(error)
          }
    }


  return (
    <div className="container todoListPage vhContainer">
    <div className="todoList_Content">
        <div className="inputBox">
            <form action=""   onSubmit={handleSubmit(addTodo)}>
                <input className="formControls_input" placeholder="請輸入待辦事項 " type="text" id="content" {...register("content", { required: true})} />
                <button type="submit">
                    <i className="fa fa-plus"></i>
                </button>
            </form>

        </div>
        

      {
        todoList.length > 0 ?  
        <div className="todoList_list">
        <ul className="todoList_tab">
            <li onClick={()=>setOptions('all')} className={options === 'all' ? 'active' : ''}>全部</li>
            <li onClick={()=>setOptions('pending')} className={options === 'pending' ? 'active' : ''}>待完成</li>
            <li onClick={()=>setOptions('complete')} className={options === 'complete' ? 'active' : ''}>已完成</li>
        </ul>
        <div className="todoList_items">
            <ul className="todoList_item">                 
            {
                filteredList.length > 0 && filteredList.map((itm,idx)=>{
              
                    return <ListItem key={`itm-${itm.id}`} id={itm.id} content={itm.content} completed_at={itm.completed_at} toggleTodo={toggleTodo} removeTodo={removeTodo} editTodo={editTodo} options={options} />
                }) 
            }
            </ul>
            <div className="todoList_statistics">
                <p>{ todoList.filter((itm)=>  !itm.completed_at ).length} 個待完成項目</p>
                <button onClick={clear}>清除已完成項目</button>
            </div>
        </div>
    </div>
    :
    <div>目前尚無代辦事項</div>
      }

    </div>
</div>
  )
}

export default TodoTable