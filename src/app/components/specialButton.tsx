import { motion } from 'framer-motion';
import React from 'react';

interface SpecialButtonProps{
    text: string;
}

const SpecialButton: React.FC<SpecialButtonProps> = ({text}) => {
  return (
    <motion.button 
        initial={{'--x': "100%", scale:1} as any}
        animate={{'--x': "-100%"} as any}
        whileTap={{scale:0.95}}
        transition={{repeat: Infinity, repeatType: 'loop', repeatDelay: 0.1, type:"spring", stiffness: 30, damping: 5, mass: 1, scale: { type: "spring", stiffness: 10, damping: 5, mass: 0.1 }}}
        className='px-6 py-2 rounded-md relative radial-gradient'>
        <span className='text-neutral-100 tracking-wide font-bold h-full w-full block relative linear-mask'>
            {text}
        </span>
        <span className='block absolute inset-0 rounded-md p-px linear-overlay'/>
    </motion.button>
  );
};

export default SpecialButton;