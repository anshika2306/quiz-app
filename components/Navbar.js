import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdAccountCircle } from 'react-icons/md'
const Navbar = () => {
    return (
        <div className='flex flex-col md:flex-row md:justify-start justify-between py-2'>
            <div className='logo'>
                <Image src="/digiaccel.svg" alt="logo" width={100} height={30} />
            </div>
            <div className='login cursor-pointer absolute right-0 top-4 mx-5'>
                <Link href={'/login'}>
                <MdAccountCircle className='text-xl md:text-2xl flex'/>
                </Link>
            </div>
        </div>
    )
}

export default Navbar