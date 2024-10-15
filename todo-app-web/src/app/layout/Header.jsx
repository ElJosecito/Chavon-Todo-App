import { useState, useEffect } from 'react'

// icons
import {House } from 'lucide-react'

//navigation
import { Link } from 'react-router-dom'

function Header() {

    const [scroll, setScroll] = useState(false)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 70) {
                setScroll(true)
            } else {
                setScroll(false)
            }
        })
    }, [])

    // mobile menu
    const [menu, setMenu] = useState(false)

    const handleMenu = () => {
        setMenu(!menu)
    }

    //path
    // const path = useLocation().pathname

    return (
        <header className='w-full flex justify-center fixed z-[10000] outline outline-b outline-[0.1px] outline-black/20 bg-white'>
            <div className={` w-full  px-0`}>
                <nav className={`flex justify-between items-center w-full h-20 px-8 rounded-b-md transition-all duration-500  ${scroll ? 'bg-back_white ' : 'bg-transparent'}`}>
                    <div className='text-2xl font-bold'>
                        <div className='lg:flex gap-4 items-center hidden'>
                            <div className='flex items-center gap-4 '>
                                <Link to='/'>
                                    <House color="blue" strokeWidth={2} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Header