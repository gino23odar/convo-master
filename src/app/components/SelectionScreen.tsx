import React from 'react';
import Image from 'next/image';
import aiPicture from '../../../public/aiButton.jpg';
import questPic from '../../../public/questiondb.jpg';


type SelectionScreenProps = {
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
    setShowAssist: React.Dispatch<React.SetStateAction<boolean>>;
}

const SelectionScreen: React.FC<SelectionScreenProps> = ({setShowAssist, setShowForm}) => {
  return (
    <div className='flex gap-1'>
        <div className='flex w-full btn-2 rounded-l-2xl z-20'>
            <button onClick={() => setShowForm(true)} className='btn'>
                <Image 
                    src={questPic}
                    alt='questionPicture'
                    sizes="500px"
                    className='w-full h-full rounded-l-3xl block'
                />
                <div className='flex absolute items-center top-4 left-2 z-10 font-bold bg-black bg-opacity-30 p-1 gap-2 rounded-lg'>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"  className='rotate-90' xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L12 22M12 22L5 15M12 22L19 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className='ml-auto'>Add questions to your list of topics</span>
                </div>
            </button>
        </div>
        <div className='flex w-full h-full btn-3 rounded-r-2xl z-20'>
            <button onClick={() => setShowAssist(true)} className='btn'>
                <Image 
                    src={aiPicture}
                    alt='aiButton'
                    sizes="500px"
                    className='w-full object-contain rounded-r-3xl block'
                />
                <div className='flex justify-end absolute items-center top-4 right-2 z-10 font-bold bg-black bg-opacity-30 p-1 gap-2 rounded-lg'>
                    <span className='mr-auto'>Get help from AI</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none"  className='rotate-[270deg]' xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L12 22M12 22L5 15M12 22L19 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
            </button>
            
        </div>
    </div>
  )
}

export default SelectionScreen