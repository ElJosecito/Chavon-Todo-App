import { useAuthStore } from "../../../store/auth"

import { useEffect, useState } from "react"

import { getTodos, updateTodo, deleteTodo } from "../../../api/todos"

import { Trash } from "lucide-react"

import Card from "../../components/Card"
function Home() {

  const { token, userId } = useAuthStore();
  const [todos, setTodos] = useState([]);
  const [draggedTodo, setDraggedTodo] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await getTodos(userId);
      setTodos(response.todos);
    };
    fetchTodos();
  }, [token, userId]);

  const onDragStart = (e, id) => {
    setDraggedTodo(id);
  };

  const onDrop = async (e, newStatus) => {
    e.preventDefault();
    const todoToUpdate = todos.find(todo => todo._id === draggedTodo);
    if (todoToUpdate.status !== newStatus) {
      const updatedTodo = { ...todoToUpdate, status: newStatus };
      console.log(updatedTodo);
      await updateTodo(todoToUpdate._id, updatedTodo);
      setTodos(todos.map(todo => (todo._id === draggedTodo ? updatedTodo : todo)));
    }
  };

  const handleDeleteTodo = async (e) => {
    e.preventDefault();
    const todoToDelete = todos.find(todo => todo._id === draggedTodo);
    if (todoToDelete) {
      await deleteTodo(todoToDelete._id);
      setTodos(todos.filter(todo => todo._id !== draggedTodo)); 
    }
  };

  const allowDrop = (e) => {
    e.preventDefault();
  };

  return (
    <section className='w-full h-screen flex justify-center items-center bg-[#F7F9FB]'>
      <div className='flex justify-evenly w-full max-w-screen-2xl h-full p-8 pt-24'>

        {/* Pending */}
        <div
          className="h-full bg-[#ffd86d7e] px-4 w-80 rounded-2xl"
          onDragOver={allowDrop}
          onDrop={(e) => onDrop(e, 'pending')}
        >
          <h1 className='text-4xl font-black text-yellow-400 my-10'>TODO</h1>
          {todos.map(todo => (
            todo.status === 'pending' && (
              <Card key={todo._id} id={todo._id} title={todo.title} description={todo.description} toBeFinishedAt={todo.toBeFinishedAt} status={todo.status} onDragStart={onDragStart} />
            )
          ))}
        </div>

        {/* In Progress */}
        <div
          className="h-full bg-blue-400 px-4 w-80 rounded-2xl"
          onDragOver={allowDrop}
          onDrop={(e) => onDrop(e, 'progress')}
        >
          <h1 className='text-4xl font-black text-yellow-400 my-10'>In Progress</h1>
          {todos.map(todo => (
            todo.status === 'progress' && (
              <Card key={todo._id} id={todo._id} title={todo.title} description={todo.description} toBeFinishedAt={todo.toBeFinishedAt} status={todo.status} onDragStart={onDragStart} />
            )
          ))}
        </div>

        {/* Completed */}
        <div
          className="h-full bg-green-400 px-4 w-80 rounded-2xl"
          onDragOver={allowDrop}
          onDrop={(e) => onDrop(e, 'completed')}
        >
          <h1 className='text-4xl font-black text-yellow-400 my-10'>Completed</h1>
          {todos.map(todo => (
            todo.status === 'completed' && (
              <Card key={todo._id} id={todo._id} title={todo.title} description={todo.description} toBeFinishedAt={todo.toBeFinishedAt} status={todo.status} onDragStart={onDragStart} />
            )
          ))}
        </div>
        {/* trash */}
        <div className="self-end bg-red-400 px-4 w-72 h-72 rounded-2xl flex justify-center items-center"
              onDragOver={allowDrop}
              onDrop={handleDeleteTodo}
        >
          <Trash size={100} color="white" />
        </div>
      </div>
    </section>
  );
}

export default Home