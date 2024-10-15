import { useEffect, useState, useRef } from "react"

import { getTodos, updateTodo, deleteTodo, createTodo } from "../../../api/todos"

import { Trash } from "lucide-react"

import Card from "../../components/Card"

// hot toast
import { Toaster, toast } from "react-hot-toast"


function Home() {
  const [todos, setTodos] = useState([]);
  const [draggedTodo, setDraggedTodo] = useState(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [toBeFinishedAt, setToBeFinishedAt] = useState(new Date().toISOString());
  const dateInputRef = useRef(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos();
      setTodos(response.todos);
    };
    fetchTodos();
  }, []);

  const onDragStart = (e, id) => {
    setDraggedTodo(id);
  };

  const onDrop = async (e, newStatus) => {
    e.preventDefault();
    const todoToUpdate = todos.find(todo => todo.id === draggedTodo);
    if (todoToUpdate.status !== newStatus) {
      const updatedTodo = { ...todoToUpdate, status: newStatus };
      const response = await updateTodo(todoToUpdate.id, updatedTodo);
      if (response.status === 404) {
        toast.error(response.message);
        return;
      }
      setTodos(todos.map(todo => (todo.id === draggedTodo ? updatedTodo : todo)));
    }
  };

  const handleDeleteTodo = async (e) => {
    e.preventDefault();
    const todoToDelete = todos.find(todo => todo.id === draggedTodo);
    if (todoToDelete) {
      const response = await deleteTodo(todoToDelete.id);
      toast.success(response.message);
      if (response.status === 404) {
        toast.error(response.message);
        return;
      }
      setTodos(todos.filter(todo => todo.id !== draggedTodo));
      
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  //handle create todo
  const handleCreateTodo = async (e) => {
    e.preventDefault();
    const newTodo = {
      title,
      description,
      toBeFinishedAt,
    };

    if (!title || !description) {
      toast.error("All fields are required");
      return;
    }

    const response = await createTodo( newTodo);
    toast.success(response.message);
    if (response.error) {
      toast.error(response.message);
      return;
    }
    setTodos([...todos, response.todo]);

    //reset form
    setTitle('');
    setDescription('');
    dateInputRef.current.value = "";

  }

  return (
    <>
      <section className="w-full min-h-screen h-fit flex justify-center items-center bg-[#F7F9FB]">
        <div className="flex flex-wrap justify-evenly w-full max-w-screen-2xl p-8 pt-24 gap-3 ">


        <div className="flex flex-col gap-4 justify-between max-h-[850px]">
            {/* add task form */}
            <div className="bg-white p-4 w-full md:w-80 rounded-2xl ">
              <form onSubmit={(e)=>{
                handleCreateTodo(e);
              }}>
                <h1 className="text-4xl font-black text-yellow-400 my-10">Add Task</h1>
                <input type="text" placeholder="Title" className="w-full p-2 rounded-xl border border-gray-200 mb-4" value={title} onChange={(e)=>{
                  setTitle(e.target.value);
                }} />
                <textarea placeholder="Description" className="w-full p-2 rounded-xl border border-gray-200 mb-4" value={description} onChange={(e)=>{
                  setDescription(e.target.value);
                }}/>
                <input type="date" className="w-full p-2 rounded-xl border border-gray-200 mb-4" ref={dateInputRef}
                  onChange={(e)=>{
                    const selectedDate = new Date(e.target.value); 
                    const formattedDate = selectedDate.toISOString(); 
                    setToBeFinishedAt(formattedDate); 
                  }}
                />
                <button className="w-full p-2 rounded-xl font-bold bg-yellow-400 text-white">Add Task</button>
              </form>
            </div>


            {/* Trash */}
            <div
              className="self-end bg-red-400 px-4 w-full md:w-80 h-72 rounded-2xl flex justify-center items-center"
              onDragOver={allowDrop}
              onDrop={handleDeleteTodo}
            >
              <Trash size={100} color="white" />
            </div>
          </div>
          {/* Pending */}
          <div
            className="min-h-[850px] bg-[#ffd86d7e] px-4 w-full md:w-80 rounded-2xl mb-4 md:mb-0 pb-5"
            onDragOver={allowDrop}
            onDrop={(e) => onDrop(e, 'pending')}
          >
            <h1 className="text-4xl font-black text-yellow-400 my-10">TODO</h1>
            {todos.map(todo => (
              todo && todo.status === 'pending' && (
                <Card key={todo.id} id={todo.id} title={todo.title} description={todo.description} toBeFinishedAt={todo.toBeFinishedAt} status={todo.status} onDragStart={onDragStart} />
              )
            ))}
          </div>

          {/* In Progress */}
          <div
            className="min-h-[850px] bg-[#60a5fa9a] px-4 w-full md:w-80 rounded-2xl mb-4 md:mb-0 pb-5"
            onDragOver={allowDrop}
            onDrop={(e) => onDrop(e, 'progress')}
          >
            <h1 className="text-4xl font-black text-blue-600 my-10">Progress</h1>
            {todos.map(todo => (
              todo && todo.status === 'progress' && (
                <Card key={todo.id} id={todo.id} title={todo.title} description={todo.description} toBeFinishedAt={todo.toBeFinishedAt} status={todo.status} onDragStart={onDragStart} />
              )
            ))}
          </div>

          {/* Completed */}
          <div
            className="min-h-[850px] bg-[#4ADE80] px-4 w-full md:w-80 rounded-2xl mb-4 md:mb-0 pb-5"
            onDragOver={allowDrop}
            onDrop={(e) => onDrop(e, 'completed')}
          >
            <h1 className="text-4xl font-black text-green-800 my-10">Completed</h1>
            {todos.map(todo => (
              todo && todo.status === 'completed' && (
                <Card key={todo.id} id={todo.id} title={todo.title} description={todo.description} toBeFinishedAt={todo.toBeFinishedAt} status={todo.status} onDragStart={onDragStart} />
              )
            ))}
          </div>
        </div>
      </section>
      <Toaster position="bottom-center"/>
    </>
  );
}

export default Home