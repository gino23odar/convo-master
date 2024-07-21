import React, { useRef, useEffect, use } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface RevealProps {
    children: JSX.Element;
    width?:"fit-content" | "full";
    delayed?: number;
}

const Reveal: React.FC<RevealProps> = ({children, width = "fit-content", delayed = 1.5}) => {
    const ref = useRef(null);
    const inView = useInView(ref, {once: true});

    const controls = useAnimation();
    const slideControl = useAnimation();

    useEffect(() => {
        if(inView){
            controls.start("end");
            slideControl.start("end");
        }
    }, [inView, controls, slideControl])


  return (
    <div ref={ref} className={`relative ${width} overflow-hidden`}>
        <motion.div
            variants={{
                start: {opacity:0, x: -1000},
                end: {opacity:1, x:0}
            }}
            initial="start"
            animate={controls}
            transition ={{ duration: 1, delay: delayed}}
        >
            {children}
        </motion.div>
        
    </div>
  )
}

export default Reveal