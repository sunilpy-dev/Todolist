import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import './App.css'

import { v4 as uuidv4 } from 'uuid';//this helps to create the unique id
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {
  const [todo, settodo] = useState("")//this is for add and
  const [todos, settodos] = useState([])//this is for the all todos or you can say todos array
  const [showfinished, setshowfinished] = useState(true)

  useEffect(() => {
    let todosString = localStorage.getItem("todos")//here we ahre simply fetching teh lodos key value from the local storage
    if (todosString) {//and here we are chaking if it is null then don't print else set the todos
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }
  }, [])

  const savTols = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }


  const toggleFinished = (e) => {
    setshowfinished(!showfinished)
  }



  const handelEdit = (e, id) => {
    // let t=todos.filter(i=>{return i.id===id} );
    let t = todos.filter(i => i.id === id);//this work on this way also
    settodo(t[0].todo)
    let newtodos = todos.filter(item => {//the filter function works like thet it operate on arrya nd go to eaxh elements of it and apllye the function if the function result on that element is false then it does not add that and true then added that
      return item.id !== id//so here item.id=!id means the false teh condition become false so it will simply remove it and not consider it
    })//here we have changed the newtodos to remove that id which is present
    settodos(newtodos)
    savTols()
  }
  const handelDelete = (e, id) => {
    let newtodos = todos.filter(item => {//the filter function works like thet it operate on arrya nd go to eaxh elements of it and apllye the function if the function result on that element is false then it does not add that and true then added that
      return item.id !== id//so here item.id=!id means the false teh condition become false so it will simply remove it and not consider it
    })//here we have changed the newtodos to remove that id which is present
    settodos(newtodos)
    savTols()
  }
  const handelAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isComplete: false }])//now here e ahev created teh object fo todo and it work like if add cklicked then take the todos arrya dn add the object in it with the value of todo stringa nd isComplete key as false and tdod value as the string enterd
    settodo("")
    savTols()
    // console.log(todos)
  }
  const handelChange = (e) => {
    settodo(e.target.value)
  }

  const handelCheckbox = (e) => {
    let id = e.target.name;//now we get the checkbox unique id
    let index = todos.findIndex(item => {//in the index we get the matched index
      return item.id === id;
    })

    let newtodos = [...todos]//no here we ahve fetched the todos array
    newtodos[index].isComplete = !newtodos[index].isComplete;//set teh isComplete to false
    settodos(newtodos)
    savTols()
  }


  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 bg-violet-100 rounded-xl p-5 min-h-[80vh] md:w-[45%] ">
        <h1 className='font-bold text-center text-3xl '>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex gap-4 flex-col">
          <h2 className='text-2xl font-bold'>Add a todo</h2>
          <div className="flex gap-1">
            <input onChange={handelChange} value={todo} type="text" className='w-full rounded-full px-5 py-1 ' />
            <button onClick={handelAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 text-white rounded-full px-2 py-2 text-sm font-bold disabled:bg-violet-600'>Save</button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showfinished} />
        <label htmlFor="show">Show finsihed</label>
        <div className="h-[1px] bg-gray-700 opacity-15 w-[90%] mx-auto my-2"><hr /></div>
        <h1 className='text-2xl font-bold'>Your Todos</h1>
        <div className="todos">
          {todos.length == 0 && <div className='m-5 text-gray-500'>No todos to display</div>}{/*jus added the no todos to display when three is no todos */}
          {todos.map(item => {


            return (showfinished || !item.isComplete) && <div key={item.todo} className="todo flex justify-between my-3">{/* so this consdition here (showfinished || !item.isComplete) is working like if the showfinished is intially a true then show all the todos but if falls tehn go to isComplete intially is is false so it will be displayed the unFinsished todos and if  true the it will be no*/}
              <div className='flex gap-5 '>
                <input onChange={handelCheckbox} type="checkbox" checked={item.isComplete} name={item.id} id="" />
                <div className={item.isComplete ? "line-through" : ""}>{item.todo}</div>{/*so by using this we can set the calssname using teh js and here we have used the ternary operator */}
              </div>
              <div className="buttons flex h-full ">
                <button onClick={(e) => { handelEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 text-white rounded-md px-2 py-1 mx-1 text-sm font-bold'><FaEdit /></button>
                <button onClick={(e) => { handelDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 text-white rounded-md px-2 py-1 mx-1 text-sm font-bold'><MdDelete /></button>{/*here we have handel teh id as the argument to the hndleDelte functin and hre we have to give also the event e which get the evnt and act on it*/}
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
