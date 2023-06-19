import React, { useState } from 'react';
import axios from 'axios'
import {BACKEND_URL} from '../staticData'

//this component adds new todos

const ToDoForm = ({changed, setChanged}) => {

const[text, setText] =useState("")
 
 const onFormSubmit = async (e) =>{
    e.preventDefault();
    try
    {
       const response = await axios.post(`${BACKEND_URL}/todos/post`,{data:text})
       console.log("new todo inserted", response.data);
       setText("")
       setChanged(!changed);
    }
    catch(error)
    {
       console.log(error)
    }
 }

 const onTextChange = (e) => {
   console.log("todo form",e.target.value)
 	setText(e.target.value)
 }

return(
	<form className = "form" onSubmit = {onFormSubmit}>
       <input placeholder = "Enter new To Do" value={text} className="input" onChange={onTextChange}/>
	</form>
)
}

export default ToDoForm