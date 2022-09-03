import React,{useState} from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';

export default function ListItem({id,toggleTodo,content, completed_at, removeTodo , editTodo}) {
  const { register, handleSubmit, watch, reset,formState: { errors } } = useForm();

    const [checked , setChecked] = useState(()=>{
        return completed_at !== null
    });

    const [edit , setEdit] = useState(false)

    const ChangeItem = (id) =>{
        setChecked(d=> !d)
        toggleTodo(id)
    }


    const onSubmit = data => {
      editTodo(id,data)
      setEdit(false);
    }


return (
  <li>
  <div className="todoList_label">
  {
    edit ? 
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input className="formControls_input" type="text" id="content" defaultValue={content} {...register("content", { required: true})} />
        {errors.content?.type === 'required' && alert("此欄位不可留空")}
        <input className="formControls_btnSubmit" type="submit" value="confirm" />
      </form>
      <button className="" type="button" onClick={()=>{setEdit(d => !d)}}>
        Cancel
      </button> 
    </>

    :
   <>
     <label style={{"display":"flex","alignContent":"center"}}>
      <input className="todoList_input" type="checkbox" onChange={()=>ChangeItem(id)} checked={checked}/>
      <span>{content}</span>
    </label>
    <button className="" type="button" onClick={()=>{setEdit(d => !d)}}>
      Edit
    </button> 
              
    <button className="bg-danger" type="button" onClick={()=>{removeTodo(id)}}>
        <i style={{"color":'white'}} className="fa fa-times"></i>
    </button> 
   </>  
  }
  </div>
</li>
)

  
}
