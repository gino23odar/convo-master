'use client'
import React, { useState } from 'react';
import {useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth'
import {auth} from '@/app/firebase/config'
import { useRouter } from 'next/navigation';

const SignIn = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSignIn = async () => {
    try {
        const res = await signInWithEmailAndPassword(email, password);
        console.log({res});
        sessionStorage.setItem('user', "true")
        setEmail('');
        setPassword('');
        router.push('/')
    }catch(e){
        console.error(e)
    }
  };

  const goToSignUp = () => {
    router.push('/sign-up')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-500">
      <div className='flex flex-col gap-2'>
        <div className="bg-gray-900 p-5 rounded-2xl shadow-lg w-48 sm:w-96">
          <h1 className="text-white text-2xl mb-5">Sign In</h1>
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
            onClick={handleSignIn}
            className="w-full p-3 bg-blue-600 rounded text-white hover:bg-neonRgb"
          >
            Sign In
          </button>
        </div>
        <div className='flex sm:w-96 justify-center p-5'>
            <button onClick={() => goToSignUp()} className='rounded bg-txtVioletRgb hover:bg-neonRgb w-full p-3'>
              Sign-Up
            </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;