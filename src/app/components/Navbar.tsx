import React from 'react'
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import Image from 'next/image';

interface NavbarProps {
    text: string;
}

const Navbar: React.FC<NavbarProps> = ({text}) => {
  return (
    <div className='flex gap-2 pt-2'>
        <Image 
          src="/logo1024.png" 
          alt="logo" 
          className='rounded-tl-lg pb-2'
          width={100} 
          height={100} 
        />
        <nav className="flex flex-row items-center bg-white bg-opacity-10 rounded-tr-lg p-2 w-full justify-center flex-wrap">
            <button className="bg-red-600 rounded-lg p-2 w-40 sm:w-full" onClick={() => {
            signOut(auth)
            sessionStorage.removeItem('user')
            }}>
            Log out
            </button>
            <ul className="flex flex-col items-center justify-between p-2 w-full">
            <li>
                <h1 className="text-xs sm:text-2xl font-bold text-white text-center break-words">Welcome {text}!</h1>
            </li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar