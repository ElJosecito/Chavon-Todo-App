import { format } from '@formkit/tempo';
import { Ellipsis } from 'lucide-react';
import { motion } from 'framer-motion';

//routing
import { Link } from 'react-router-dom'


const Card = ({ id, title, description, toBeFinishedAt, status, onDragStart }) => {
    return (
        <motion.div
            className="w-72 h-50 shadow-md rounded-xl p-5 bg-white flex flex-col justify-between mt-4"
            key={id}
            draggable
            onDragStart={(e) => onDragStart(e, id)}

            // Añade animaciones iniciales y transiciones
            initial={{ opacity: 0, y: 20 }} // Empieza invisible y más abajo
            animate={{ opacity: 1, y: 0 }} // Termina visible en su posición original
            transition={{ duration: 0.5 }}  // Controla la duración de la animación
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
                        {title}
                    </motion.h2>
                    <Link to={`/task/${id}`}>
                        <motion.div
                            className="p-3 rounded-xl hover:bg-blue-500/10 cursor-pointer"
                            whileHover={{ scale: 1.1 }} // Aumenta ligeramente al pasar el cursor
                            whileTap={{ scale: 0.95 }} // Disminuye cuando haces clic
                        >
                            <Ellipsis size={24} color="#3b82f6" />
                        </motion.div>
                    </Link>
                </div>

                {/* description */}
                <motion.p
                    className="text-gray-500 mt-3 pr-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    {description}
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
                        {format(toBeFinishedAt, "medium")}
                    </motion.p>

                    <motion.div
                        className={`p-2 px-5 rounded-full ${status === 'progress' ? 'bg-blue-500/30' :
                                status === 'completed' ? 'bg-green-500/30' : 'bg-red-500/30'
                            }`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <p className={`font-bold capitalize ${status === 'progress' ? 'text-blue-500' :
                                status === 'completed' ? 'text-green-500' : 'text-red-500'
                            }`}>
                            {status}
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}


export default Card;