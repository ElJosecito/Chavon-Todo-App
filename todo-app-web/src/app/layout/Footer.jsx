import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <footer className='w-full flex flex-col items-center bottom-0 bg-darkblue text-back_white'>
            <div className='max-w-screen-2xl w-full pt-4'>
                <nav className='flex justify-between items-center w-full h-24 px-8 border-b-2 border-back_white'>
                    <div className='text-2xl font-bold'>
                        Logo
                    </div>
                    <ul className='md:flex md:gap-8 gap-4 font-medium text-base hidden'>
                        <motion.li whileHover={{ scale: 1.3 }}>
                            <a href='/'>Home</a>
                        </motion.li>
                    </ul>
                </nav>

            </div>
            <div className='w-full h-16 bg-[#011632] flex justify-center items-center'>
                <p className='text-white text-sm'>© 2021 All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer