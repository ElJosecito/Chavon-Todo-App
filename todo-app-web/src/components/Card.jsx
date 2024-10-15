import { format } from '@formkit/tempo';
import { Ellipsis } from 'lucide-react';


const Card = ({ id, title, description, toBeFinishedAt, status, onDragStart }) => {
    return (
        <div 
            className="w-72 h-50 shadow-md rounded-xl p-5 bg-white flex flex-col justify-between mt-4" 
            key={id} 
            draggable 
            onDragStart={(e) => onDragStart(e, id)}
        >
            <div>
                {/* title */}
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold capitalize overflow-hidden w-full">{title}</h2>
                    <div className="p-3 rounded-xl hover:bg-blue-500/10 cursor-pointer">
                        <Ellipsis size={24} color="#3b82f6" />
                    </div>
                </div>
                {/* description */}
                <p className="text-gray-500 mt-3 pr-3">{description}</p>
            </div>
            {/* date */}
            <div>
                <div className="flex justify-between items-center mt-5">
                    <p className="text-gray-500">{format(toBeFinishedAt, "medium")}</p>
                    {
                        status === 'progress' ? (
                            <div className="bg-blue-500/30 p-2 px-5 rounded-full">
                                <p className="text-blue-500 font-bold capitalize">{status}</p>
                            </div>
                        ) : status === 'completed' ? (
                            <div className="bg-green-500/30 p-2 px-5 rounded-full">
                                <p className="text-green-500 font-bold capitalize">{status}</p>
                            </div>
                        ) : (
                            <div className="bg-red-500/30 p-2 px-5 rounded-full">
                                <p className="text-red-500 font-bold capitalize">{status}</p>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}


export default Card;