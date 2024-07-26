import React from 'react'
import { socialMedia } from '../constants';
import Image from 'next/image'
import Reveal from '../utils/Reveal';

import logo from '../../../public/logo1024.png'

const FooterLink = () =>{
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div>
          <h2 className="font-bold text-xl mb-4">About Us</h2>
          <ul>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Lorem ipsum dolor sit amet</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Consectetur adipiscing elit</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Sed do eiusmod tempor</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Incididunt ut labore</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Dolore magna aliqua</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-4">Services</h2>
          <ul>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Ut enim ad minim veniam</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Quis nostrud exercitation</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Ullamco laboris nisi</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Ut aliquip ex ea commodo</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Consequat</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-4">Contact</h2>
          <ul>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Duis aute irure dolor</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">In reprehenderit in</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Voluptate velit esse</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Cillum dolore eu fugiat</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Nulla pariatur</a></li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-xl mb-4">Legal</h2>
          <ul>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Excepteur sint occaecat</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Cupidatat non proident</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Sunt in culpa qui</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Officia deserunt mollit</a></li>
            <li><a href="#" className="text-gray-400 hover:text-gray-300">Anim id est laborum</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-10">
        <p className="text-gray-500">© 2024 Coversationalist. All rights reserved.</p>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <div className='flex p-2 min-h-[10lvh]'>
        <div className='w-full bg-white bg-opacity-10 rounded'>
          <Reveal delayed={0.5}>
            <div className="w-full flex justify-around items-center md:flex-row flex-col p-6 border-t-[1px] border-t-[#3F3E45] rounded-lg">
              <div className='flex old:flex-row flex-col items-center justify-evenly overflow-hidden '>
                <Image src={logo} alt="logo" width={88} className='object-contain old:rounded-l-lg block' />
                <h2 className='flex flex-grow h-full items-center justify-center text-center font-bold bg-gray-500 p-5 old:p-8 old:rounded-r-lg'>
                  CONVERSATIONALIST
                </h2>
              </div>
              
              <div className='flex flex-grow justify-center p-6'>
                <FooterLink />
              </div>
              
                <div className="flex flex-row justify-between items-center md:mt-0 mt-2">
                  <ul className='flex relative animated-list'>
                    {socialMedia.map((social, index) => (
                      <li key={index}>
                        <div className='flex items-center'>
                          <span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                          <Image
                          key={social.id}
                          src={social.icon}
                          alt={social.id}
                          className={`w-[47px] h-[45px] object-contain cursor-pointer svg-color`}
                          onClick={() => window.open(social.link)}
                          />
                        </div> 
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
          </Reveal>
        </div>
    </div>
  )
}

export default Footer