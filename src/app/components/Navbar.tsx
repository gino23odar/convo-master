import React from 'react'
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';

interface NavbarProps {
    text: string;
}

const Navbar: React.FC<NavbarProps> = ({text}) => {
  return (
    <nav className="flex flex-row items-center bg-slate-300 rounded-lg p-2 w-full flex-wrap">
        <button className="bg-red-600 rounded-lg p-2 w-full" onClick={() => {
          signOut(auth)
          sessionStorage.removeItem('user')
        }}>
          Log out
        </button>
        <ul className="flex flex-col items-center justify-between p-2 w-full">
          <li>
            <h1 className="text-xl sm:text-2xl font-bold text-black text-center break-words">Welcome {text}!</h1>
          </li>
        </ul>
      </nav>
  )
}

Navbar.propTypes = {}

export default Navbar