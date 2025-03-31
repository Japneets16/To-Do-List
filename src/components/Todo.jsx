import React,{useEffect, useRef,useState} from 'react'
import todo_icon from '../assets/todo_icon.png'
import Todobox from '../components/Todobox'

const Todo = () => {

    //usestate nu array di form ch likhya hai kyunki jehre todo honge ohh multiple store ho skde hai 
    // localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")): []   :- get item from the local storage and apply ternary operator if data is there conv into string if not there then empty arr
    const [todoList, setTodoList]= useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")): []);

    // 👉 If you want to store a value that does NOT trigger re-renders
    const inputRef = useRef();

    const add=()=>{
        //trim is used if input ch likhde sme apan koi extra space add kiti starting ya end ch tnn ehh ohnu remove krduga
        const inputText = inputRef.current.value.trim();

        //je input ch kuch nhi likhya tnn null return houga  
        if(inputText === "") return null;


        //jo apan input ch likhange ohh iss object di form ch  houga te ohh baad ch jaa ke todolist(state) ch store hojuga
        const newTodo={
            id: Date.now(),
            text: inputText,
            isComplete : false,
        }

        setTodoList((prev)=> [...prev, newTodo]);

        //this is used to remove the text from input before writing new text
        inputRef.current.value = "";                    
    }


    //to delete the todo list 
    //id is taken bec each todo is alloted an id , and if we want to delete that then we must have the id of that todo
    const deleteTodo = (id) => {

        setTodoList((prvTodos)=>{

            // filter means create a new arr jide ch ohi todo list hougi jide thle vali cond nu satisfy krdi hai baaki saari list nu remove krdo 
            return prvTodos.filter((todo)=> todo.id !=id)
        })
    }



    // The word "toggle" means switching between two states (TRUE/FALSE).
    // 👉 In your function, toggle(id) flips the isComplete value of a to-do item.
    // If isComplete is false, it becomes true.
    // If isComplete is true, it becomes false.
    const toggle=(id)=>{
        setTodoList((prvTodos)=>{
            return prvTodos.map((todo)=>{
                if(todo.id== id){
                    return {...todo, isComplete: !todo.isComplete}

                }
                return todo;
            })
        })
    }


    //👉 If you want to run some code when the component mounts, updates, or unmounts.
    useEffect(()=>{
        
        // local storage tnn lita bec jo vi asi input ch likhya si ohh jado refresh krde si tnn udd janda si tnn asi ohh data nu localstorage of the browser ch store krlange te othon hi data nu chk lvange 
        // todos : ik key haigi hai 
        // json .stringify() : asi use kita hai tnn ki asi todolist vale arr nu string ch conv kr skiye
        localStorage.setItem("todos",JSON.stringify(todoList));
    },[todoList])


  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

{/* ------------title----------- */}

    <div className=' flex items-center mt-7 gap-2 '>
        <img className='w-8' src={todo_icon} alt="" />
    <h1 className='text-3xl font-semibold '> To-Do LIST </h1>
    </div>


{/* ---------input box---------- */}

    <div className='flex items-center bg-grey-500 rounded-full my-6'>
        <input ref={inputRef} type="text"  placeholder='Add your task' className='bg-gray-300 border-0 outline-none flex-1 rounded-l-full h-12 pl-6 pr-2 placeholder:text-slate-600' />
        <button onClick={add} className='bg-orange-500 rounded-r-full h-12 w-22 text-white font-medium text-lg cursor-pointer '> Add </button>
    </div>

    
    

    {/* ------------to do box-------------- */}

    <div>

    {/* The todoList is an array of to-do items.
    The map function loops through each item in todoList.
    For each item, it creates a <Todobox> component.
    The <Todobox> component receives data like text, id, isComplete, and deleteTodo as props.
    This ensures that each to-do item appears on the screen. */}

    {todoList.map((item,index)=>{
        return <Todobox key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo} toggle={toggle} />
    })}
    </div>


    </div>
  )
}

export default Todo