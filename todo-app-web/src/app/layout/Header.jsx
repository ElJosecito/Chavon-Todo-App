import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// icons
import { Menu, X, User, House } from 'lucide-react'

//state management
import { useAuthStore } from '../../../store/auth'

//get user data
// import { getUser } from '../../../api/user'

//navigation
import { Link, useLocation } from 'react-router-dom'
// import logo from '../../assets/images/logo.png'

function Header() {

    const [scroll, setScroll] = useState(false)
    const { logout } = useAuthStore()
    const [userHeader, setUserHeader] = useState({})

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 70) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }, [])

    // // check if user is logged
    const { token, userId, user } = useAuthStore()

    useEffect(() => {
        setUserHeader(user)
    }, [token, userId])

    // mobile menu
    const [menu, setMenu] = useState(false)

    const handleMenu = () => {
        setMenu(!menu)
    }


    // display mobile menu
    const mobileMenu = menu ? 'flex' : 'hidden'

    //path
    const path = useLocation().pathname

    return (
        <header className='w-full flex justify-center fixed z-[10000] outline outline-b outline-[0.1px] outline-black/20 bg-white'>
            <div className={` w-full  px-0`}>
                <nav className={`flex justify-between items-center w-full h-20 px-8 rounded-b-md transition-all duration-500  ${scroll ? 'bg-back_white ' : 'bg-transparent'}`}>
                    <div className='text-2xl font-bold'>
                        <div className='lg:flex gap-4 items-center hidden'>
                            <div className='flex items-center gap-4 '>
                                <Link to='/profile'>
                                    {
                                        userHeader.image ? (
                                            <img src={`${userHeader.image}`} alt="user" className='w-10 h-10 rounded-full' />
                                        ) : (
                                            <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center'>
                                                <User color="white" strokeWidth={3} />
                                            </div>
                                        )
                                    }
                                </Link>
                                <p className={`text-lg font-semibold capitalize ${scroll ? 'text-black' : `${path !== '/' ? "text-black" : "text-black 2xl:text-back_white "}`}`}>{`${user.firstName}`}</p>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center gap-8'>
                        {/* Home btn */}
                        <Link to='/home'>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.90 }} className='flex items-center gap-1 bg-blue-500/30 p-2 px-5 rounded-full'>
                                <House color="blue" strokeWidth={2} />
                            </motion.button>
                        </Link>
                    {/* Logout btn */}
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.90 }} className='flex items-center gap-1 bg-red-500/30 p-2 px-5 rounded-full' onClick={() => {
                        logout()
                    }}>
                        <p className='text-red-500 font-bold'>Log Out</p>
                    </motion.button>

                    </div>


                    {/* mobile menu */}
                    <div className='lg:hidden flex items-center'>
                        <button onClick={handleMenu} className='text-2xl'>
                            {menu ? <X absoluteStrokeWidth /> : <Menu absoluteStrokeWidth />}
                        </button>
                    </div>
                    {/* 
                    <ul className={`flex flex-col gap-8 font-semibold text-base ${mobileMenu} lg:hidden absolute top-20 left-0 right-0 ${scroll ? 'bg-back_white shadow-lg' : 'bg-white'} rounded-md shadow-lg p-8 transition-all duration-500`}>
                        <motion.li whileHover={{ scale: 1.2 }} className='text-sm' onClick={handleMenu}>
                            <a href='/home'>Home</a>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.2 }} className='text-sm' onClick={handleMenu}>
                            <a href='#services'>Services</a>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.2 }} className='text-sm' onClick={handleMenu}>
                            <a href='#about'>About</a>
                        </motion.li>
                        <motion.li whileHover={{ scale: 1.2 }} className='text-sm' onClick={handleMenu}>
                            <a href='#contact'>Contact</a>
                        </motion.li>
                        <div className='flex gap-4 items-center'>
                            <div className='flex items-center gap-4'>
                                <Link to='/profile'>
                                    {
                                        userHeader.image ? (
                                            <img src={`${userHeader.image}`} alt="user" className='w-10 h-10 rounded-full' />
                                        ) : (
                                            <div className='w-10 h-10 bg-green-700 rounded-full flex items-center justify-center'>
                                                <User />
                                            </div>
                                        )
                                    }
                                </Link>
                                <p className={`text-lg font-semibold capitalize ${scroll ? 'text-black' : `${path !== '/' ? "text-black" : "text-back_white"}`}`}>{`${user.firstName} ${user.lastName}`}</p>
                            </div>
                        </div>
                    </ul> */}
                </nav>
            </div>
        </header>
    )
}

export default Header