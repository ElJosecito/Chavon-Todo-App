import { useParams } from "react-router-dom"
import { getTodoById, updateTodo, deleteTodo } from "../../../api/todos"
import { useEffect, useState, useRef } from "react"
import { format } from "@formkit/tempo"
import { Trash } from "lucide-react"
import { motion } from "framer-motion"

import { toast, Toaster } from "react-hot-toast"

import { useNavigate } from "react-router-dom"

function TaskPage() {

    const { id } = useParams()

    const [task, setTask] = useState(null)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [toBeFinishedAt, setToBeFinishedAt] = useState('')
    const [status, setStatus] = useState('')

    const dateInputRef = useRef(null)


    // Routing
    const navigate = useNavigate()

    // Update Task
    const handleUpdate = async (e) => {
        e.preventDefault()
        const updatedTask = {
            title,
            description,
            toBeFinishedAt,
            status
        }

        const response = await updateTodo(id, updatedTask)
        if (response.status === 404) {
            toast.error(response.message)
            return
        }
        setTask(updatedTask)

        toast.success(response.message)

        setTitle('')
        setDescription('')

        dateInputRef.current.value = ''
    }

    // Delete Task
    const handleDeleteTodo = async () => {
        const response = await deleteTodo(id)
        if (response.status === 404) {
            toast.error(response.message)
            return
        }
        toast.success(response.message)
        setTimeout(() => {
            navigate('/')
        }, 3000)
    }



    const fetchTask = async (id) => {
        const response = await getTodoById(id)
        if (response.status === 404) {
            toast.error(response.message)
            navigate('/404')
            return
        }
        setTask(response.todo)
    }

    useEffect(() => {
        fetchTask(id)
    }, [id])


    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setToBeFinishedAt(task.toBeFinishedAt);
            setStatus(task.status);
        }
    }, [task])

    return (
        <>
            <section className='w-full h-screen flex justify-center items-center bg-[#F7F9FB]'>
                <div className='w-full max-w-screen-xl p-4 flex justify-between gap-5'>
                    <motion.div
                        className="w-1/2 h-50 shadow-md rounded-xl p-5 bg-white flex flex-col justify-between mt-4 "
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div>
                            {/* title */}
                            <div className="flex justify-between items-center">
                                <motion.h2
                                    className="text-2xl font-bold capitalize overflow-hidden w-full"
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {task?.title}
                                </motion.h2>
                                <motion.div
                                    className="p-3 rounded-xl hover:bg-blue-500/10 cursor-pointer"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDeleteTodo()}
                                >
                                    <Trash size={24} color="red" />
                                </motion.div>
                            </div>

                            {/* description */}
                            <motion.p
                                className="text-gray-500 mt-3 pr-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                            >
                                {task?.description}
                            </motion.p>
                        </div>

                        {/* date and status */}
                        <div>
                            <div className="flex justify-between items-center mt-5">
                                <motion.p
                                    className="text-gray-500"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.4, delay: 0.2 }}
                                >
                                    {format(task?.toBeFinishedAt, "medium")}
                                </motion.p>

                                <motion.div
                                    className={`p-2 px-5 rounded-full ${task?.status === 'progress' ? 'bg-blue-500/30' :
                                        task?.status === 'completed' ? 'bg-green-500/30' : 'bg-red-500/30'
                                        }`}
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <p className={`font-bold capitalize ${task?.status === 'progress' ? 'text-blue-500' :
                                        status === 'completed' ? 'text-green-500' : 'text-red-500'
                                        }`}>
                                        {task?.status}
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* update form */}
                    <motion.form
                        className="w-1/2 h-50 shadow-md rounded-xl p-5 bg-white flex flex-col justify-between mt-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        onSubmit={handleUpdate}
                    >
                        <h1 className="text-2xl font-bold capitalize">Update Task</h1>

                        {/* Title Input */}
                        <input
                            type="text"
                            placeholder="Title"
                            className="w-full p-2 rounded-xl border border-gray-200 mb-4"
                            value={title}  // Usar el estado `title`
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {/* Description Input */}
                        <textarea
                            placeholder="Description"
                            className="w-full p-2 rounded-xl border border-gray-200 mb-4"
                            value={description}  // Usar el estado `description`
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {/* Date Input */}
                        <input
                            type="date"
                            placeholder="Date"
                            className="w-full p-2 rounded-xl border border-gray-200 mb-4"
                            value={toBeFinishedAt ? toBeFinishedAt.slice(0, 10) : ''}  // Usar el estado `toBeFinishedAt`
                            ref={dateInputRef}
                            onChange={(e) => {
                                const selectedDate = new Date(e.target.value);
                                const formattedDate = selectedDate.toISOString();
                                setToBeFinishedAt(formattedDate);
                            }}
                        />

                        {/* Status Select */}
                        <select
                            className="w-full p-2 rounded-xl border border-gray-200 mb-4"
                            value={status}  // Usar el estado `status`
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>

                        <button className="bg-blue-500 text-white p-2 rounded-xl">Update</button>
                    </motion.form>



                </div>
            </section>
            <Toaster position="bottom-center"/>
        </>
    )
}

export default TaskPage