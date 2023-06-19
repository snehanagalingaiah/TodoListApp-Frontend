import {useEffect, useState, useRef} from "react"
import axios from "axios";
import {BACKEND_URL} from '../staticData'
import ToDosView from './ToDosView'
import ToDoForm from  "./ToDoForm"
import Tabs from "./Tabs"

const DisplayTodos = () =>{

	const [allToDos, setAllToDos] = useState([])
	const [changed, setChanged] = useState(false)
	const [currentTab, setCurrentTab] = useState("ALL")
	const allToDosCopy = useRef([]);

//useEffect to fetch data on page load
	useEffect(() =>{
     
      async function fetchData(){
	    	try
	    	{
		       const res = await axios.get(`${BACKEND_URL}/todos/get`);
           console.log("get all todos on front end", res.data)
           setAllToDos(res.data);
           allToDosCopy.current = JSON.parse(JSON.stringify(res.data));
           console.log("copy allToDos", allToDosCopy)
	      }
	      catch(error)
	      {
	      	console.log(error);
	      }
	  }
	  fetchData()
	}, [changed])


//filtering data on tab change
	useEffect(() => {

 if(allToDosCopy.current.length>0){
	    console.log("current tab changed to", currentTab, allToDosCopy)
		if(currentTab === "ACTIVE")
		{
			  const activeArray = allToDosCopy.current.filter((todo)=>{
				    return todo.done ===false
			    });
			console.log("active array", activeArray)
			setAllToDos(activeArray)
		}

		else if (currentTab ==="DONE")
		{
      const doneArray = allToDosCopy.current.filter((todo)=>{
			  return todo.done ===true
			});
			console.log("done array", doneArray)
			setAllToDos(doneArray)
		}
		else
			setAllToDos(allToDosCopy.current)
	}
   
	},[currentTab])


	return(
		 <>
		  <ToDoForm changed={changed} setChanged={(p)=>setChanged(p)} />
		  <div>
          <Tabs currentTab={currentTab} setCurrentTab={(p)=>setCurrentTab(p)}/>
		  </div>
	  <ul>
      {allToDos.map(todo => (
        <ToDosView key={todo._id} todo = {todo} changed={changed} setChanged={(p)=>setChanged(p)}/>
      ))}
    </ul>
    </>
		);
}

export default DisplayTodos;