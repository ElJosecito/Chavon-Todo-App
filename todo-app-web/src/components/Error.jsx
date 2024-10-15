import { useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
function Error() {
    const navigate = useNavigate()
    return (
        <section className='w-full h-screen flex justify-center items-center bg-[#F7F9FB]'>
            <div className='w-96 h-96 flex flex-col justify-center items-center gap-4'>
                <h1 className='text-9xl font-black text-gray-800'>404</h1>
                <p className='text-xl text-gray-600'>Task not found</p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => navigate('/')}
                    className='bg-blue-400 text-white px-4 py-2 rounded-xl'
                >
                    Go Home
                </motion.button>
            </div>
        </section>
    )
}

export default Error