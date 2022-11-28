import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdAccountCircle } from 'react-icons/md'
import { useState } from 'react'
const Navbar = ({ user, logout }) => {
    const [dropdown, setDropdown] = useState(false)
    const toggleDropdown = () => {
        setDropdown(!dropdown)
    }
    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-between py-2'>
            <div className='logo mx-5'>
                <Link href={'/'}><Image src="/logo.png" alt="logo" width={100} height={30} /></Link>
            </div>
            <div className='m-2 flex items-center space-x-10 font-bold md:text-xl'>
                <h1>Quizzller</h1>
            </div>
            <div className='login cursor-pointer absolute right-0 top-4 mx-5'>
                {user.value && <MdAccountCircle onClick={toggleDropdown} className='text-xl md:text-2xl flex' />}
                {!user.value && <Link href={'/login'}>
                    <button className='bg-gradient-to-r from-black to-blue-500 text-white font-bold py-2 px-4 rounded drop-shadow'>Login</button>
                </Link>}
            </div>
            {dropdown && <div className='absolute right-5 top-10 bg-black font-bold rounded-md px-4'>
                <ul>
                    <Link href={'/'}><li className='py-1 text-sm hover:text-white'>
                        My Profile
                    </li></Link>
                    <Link href={'/results'}><li className='py-1 text-sm hover:text-white'>
                        My Progress
                    </li></Link>
                    <a onClick={logout}><li className='cursor-pointer py-1 text-sm hover:text-white'>
                        Logout
                    </li></a>
                </ul>
            </div>}
        </div>
    )
}

export default Navbar