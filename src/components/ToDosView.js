import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import {BACKEND_URL} from '../staticData'
import {useState, useEffect} from 'react'

const ToDosView = ({todo, changed, setChanged}) => {

	const [editing, setEditing] = useState(false)
	const [text, setText] = useState(todo.data)
    

    //function to strike through the done tasks
    const toggletodo = async () =>
    {

        try
        {
          const response = await axios.put(`${BACKEND_URL}/todos/toggle/${todo._id}`)
          console.log("toggled to do", response)
          setChanged(!changed)
    
        }
        catch(error)
        {
          console.log(error);
        }
    }
    
    //function to update the edited todo
    const submitHandler = async (e) =>
    {
         e.preventDefault();
         let updatedToDo;
        try
        {
           updatedToDo = await axios.put(`${BACKEND_URL}/todos/edit-todo/${todo._id}`, {data:text})
           console.log("submit handler response",updatedToDo.data)    
        }
        catch(error)
        {
           console.log(error);
        }       
         setEditing('');
         setChanged(!changed);
    }

   //function to delete the selected todo
    const deleteToDo = async (e) =>
    {
    	try
    	{
          const response = await axios.delete(`${BACKEND_URL}/todos/delete-todo/${todo._id}`)
          console.log("delete to do response", response)
          setChanged(!changed)
    	}
    	catch(error)
    	{
          console.log(error);
    	}
    }

 return(
      <li className="task" >

      <span style = {{display: editing? 'none':'', textDecoration: todo.done? 'line-through' : ''}} onClick={() =>toggletodo(todo)} className="task-name">{todo.data}</span>
      <form style={{ display: editing ? 'inline' : 'none' }} onSubmit={submitHandler}>
         <input type="text" value={text} className="edit-todo" onChange={(e) => setText(e.target.value)}/>
       </form>
      <span className="icon" onClick={deleteToDo}> <DeleteIcon/> </span>
       <span className="icon" onClick={() => setEditing(!editing)}> <EditIcon/> </span>

      </li>
 	)

}

export default ToDosView