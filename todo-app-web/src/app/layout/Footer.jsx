import { motion } from 'framer-motion'


// react icons, fontawesome 6 icons
import { Facebook, Instagram, LinkedinIcon, Youtube } from 'lucide-react';


function Footer() {
    return (
        <footer className='w-full flex flex-col items-center bottom-0 bg-darkblue text-back_white'>
            <div className='max-w-screen-2xl w-full pt-4'>
                <nav className='flex justify-between items-center w-full h-24 px-8 border-b-2 border-back_white'>
                    <div className='text-2xl font-bold'>
                        {/* <Image src={logo} alt="" /> */}
                        Logo
                    </div>
                    <ul className='md:flex md:gap-8 gap-4 font-medium text-base hidden'>
                        <motion.li whileHover={{ scale: 1.3 }}>
                            <a href='/'>Home</a>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.3 }}>
                            <a href='/services'>Services</a>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.3 }}>
                            <a href='/about'>About</a>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.3 }}>
                            <a href='/contact'>Contact</a>
                        </motion.li>
                    </ul>
                </nav>

                <div className='w-full h-24 flex flex-col md:flex-row justify-center md:justify-between items-start md:items-center md:gap-4 my-8 px-5'>
                    <p className='text-back_white text-sm py-3'>© 2021 All rights reserved</p>
                    {/* socials */}
                    <div className='flex gap-4 '>
                        <div className='flex justify-center items-center h-9 w-9 bg-darkblue rounded-full'>
                            <Facebook className='text-white ' />
                        </div>
                        <div className='flex justify-center items-center h-9 w-9 bg-darkblue rounded-full'>
                            <Instagram className='text-white ' />
                        </div>
                        <div className='flex justify-center items-center h-9 w-9 bg-darkblue rounded-full'>
                            <LinkedinIcon className='text-white ' />
                        </div>
                        <div className='flex justify-center items-center h-9 w-9 bg-darkblue rounded-full'>
                            <Youtube className='text-white ' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-16 bg-[#011632] flex justify-center items-center'>
                <p className='text-white text-sm'>© 2021 All rights reserved</p>
            </div>
        </footer>
    )
}

export default Footer