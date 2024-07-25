import React from 'react'
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import Image from 'next/image';

interface NavbarProps {
  showDelButton: boolean;
  setShowDelButton: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({ showDelButton, setShowDelButton }) => {

  const handleEditButton = () =>{
    setShowDelButton(!showDelButton);
  }

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
            <button className="bg-red-600 hover:bg-rose-800 rounded-lg p-2 w-40 sm:w-full" onClick={() => {
            signOut(auth)
            sessionStorage.removeItem('user')
            }}>
            Log out
            </button>
            <button className="bg-neonRgb hover:bg-txtVioletRgb rounded-lg p-2 w-40 sm:w-full" onClick={handleEditButton}>
            Edit Lists
            </button>
        </nav>
    </div>
  )
}

export default Navbar