import React, { useRef } from 'react';
import Image from 'next/image';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';


import aiPicture from '../../../public/aiButton.jpg';
import questPic from '../../../public/questiondb.jpg';

gsap.registerPlugin(useGSAP);

type SelectionScreenProps = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAssist: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({setShowAssist, setShowForm}) => {
    const formContainer = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: formContainer });

    const onClickLeft = contextSafe(() => {
        gsap.to('.btn-form', { duration:.2, x: -800, scale:1.02, ease:"power4.inOut" }); // CHANGE THIS
    });

    const onClickRight = contextSafe(() => {
        gsap.to('.btn', { duration:.2, x: 800, scale:1.02, ease:"power4.inOut" }); // CHANGE THIS
    });

    const setDelayedShowForm = () =>{
        setTimeout(() => {
            setShowForm(true);
        }, 200);
    }

    const setDelayedShowAssist = () =>{
        setTimeout(() => {
            setShowAssist(true);
        }, 200);
    }


  return (
    <div className='flex gap-1' ref={formContainer}>
        <div className='flex w-full btn-2 rounded-l-2xl z-20' >  
                <button onClick={() => { onClickLeft(); setDelayedShowForm()}} className='btn-form'>
                    <Image 
                        src={questPic}
                        alt='questionPicture'
                        sizes="500px"
                        className='w-full h-full rounded-l-3xl block'
                    />
                    <div className='flex absolute items-center top-4 left-2 z-10 font-bold bg-black bg-opacity-30 p-1 gap-2 rounded-lg'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"  className='rotate-90' xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L12 22M12 22L5 15M12 22L19 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className='ml-auto'>Add questions to your list of topics</span>
                    </div>
                </button>
            
            
        </div>
        <div className='flex w-full h-full btn-3 rounded-r-2xl z-20' >
            <button onClick={() => {onClickRight(); setDelayedShowAssist()}} className='btn'>
                <Image 
                    src={aiPicture}
                    alt='aiButton'
                    sizes="500px"
                    className='w-full object-contain rounded-r-3xl block'
                />
                <div className='flex justify-end absolute items-center top-4 right-2 z-10 font-bold bg-black bg-opacity-30 p-1 gap-2 rounded-lg'>
                    <span className='mr-auto'>Get help from AI</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"  className='rotate-[270deg]' xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L12 22M12 22L5 15M12 22L19 15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </button>
            
        </div>
    </div>
  )
}

export default SelectionScreen