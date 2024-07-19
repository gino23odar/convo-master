import React from 'react'
import { socialMedia } from '../constants';
import Image from 'next/image'

const Footer = () => {
  return (
    <div className='flex p-2 min-h-[10lvh]'>
        <div className='w-full bg-white opacity-80 rounded'>
          <div className="w-full flex justify-center items-center md:flex-row flex-col p-6 border-t-[1px] border-t-[#3F3E45]">
            <div className='w-full'>
              <Image src="/logo1024.png" alt="logo" width={100} height={100} />
            </div>
            <div className="flex flex-row justify-between items-center md:mt-0 mt-2">
              <ul className='flex relative animated-list'>
                {socialMedia.map((social, index) => (
                  <li key={index}>
                    <div>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <Image
                      key={social.id}
                      src={social.icon}
                      alt={social.id}
                      className={`w-[48px] h-[48px] object-contain cursor-pointer svg-color`}
                      onClick={() => window.open(social.link)}
                      />
                    </div> 
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Footer