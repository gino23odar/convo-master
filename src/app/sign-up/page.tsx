'use client'
import React, { useState } from 'react';
import {useCreateUserWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const SignUp = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [name, setName] = React.useState<string>('')
  const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
        const res = await createUserWithEmailAndPassword(email, password)

        if(res?.user){
            await updateProfile(res.user, {
                displayName: name
            })
            console.log({res})
          sessionStorage.setItem('user', 'true')
          setEmail('');
          setPassword('');
          setName('');
          router.push('/')
        }
    } catch(e){
        console.error(e)
    }
  };

  const goToLogin = () => {
    router.push('/sign-in')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-500">
      <div className='flex flex-col gap-2'>
        <div className="flex flex-col bg-gray-900 p-5 rounded-2xl shadow-lg w-48 sm:w-96">
          <h1 className="text-white text-2xl mb-5">Sign Up</h1>
          <input 
            type="name" 
            placeholder="Username" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-3 mb-4 bg-gray-100 rounded outline-none text-black font-bold placeholder-gray-500"
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-3 mb-4 bg-gray-100 rounded outline-none text-black font-bold placeholder-gray-500"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-3 mb-4 bg-gray-100 rounded outline-none text-black font-bold placeholder-gray-500"
          />
          <button 
            onClick={handleSignUp}
            className="w-full p-3 bg-blue-600 rounded text-white hover:bg-neonRgb"
          >
            Sign Up
          </button>
        </div>
        <div className='flex sm:w-96 justify-center p-5'>
          <button onClick={() => goToLogin()} className='rounded bg-txtVioletRgb hover:bg-neonRgb w-full p-3'>
            Sign-In
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;