import React, { useState, useEffect } from 'react';
import DeleteButton from './DeleteButton';

// remember to fix this when the data is defined
type AccordionProps = {
    entry: any[];
    showDelButton: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ entry, showDelButton }) =>{
    const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

    const handleToggle = (index: string) => {
        setActiveQuestion(activeQuestion === index ? null : index);
    }

    useEffect(() => {
      setActiveQuestion(null)
    }, [entry])


    return (
        <div className='flex flex-col w-full'>
            {entry && Object.entries(entry).map(([index, entry], arrayIndex, array) => (
                <div className='flex w-full items-center' key={index} >
                    <button
                        onClick={() => handleToggle(index)}
                        tabIndex={0}
                        className={`flex items-center justify-between p-2 mx-2 w-full font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800
                        ${arrayIndex === 0 ? 'first:rounded-t-xl' : ''}
                        ${arrayIndex === array.length - 1 ? 'last:rounded-b-xl' : ''}`}
                    >
                        <div className={`flex items-center justify-between w-full ${activeQuestion === index ? 'box' : ''}`}>
                            <p className='font-bold sm:text-2xl flex-grow'>
                                {entry.question}
                            </p>
                            <svg data-accordion-icon className={`w-3 h-3 ml-2 shrink-0 transition-transform duration-500 ${activeQuestion === index ? 'rotate-0' : 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                            </svg>
                        </div>
                        {activeQuestion === index && (
                            <div className={`p-2 w-full border border-b-0 rounded-xl mx-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900`}>
                                <p>{entry.answer}</p>
                            </div>
                        )}
                    </button>
                    {showDelButton && <DeleteButton id={entry.id} quest={true} />}
                </div>
            ))}
        </div>
    );
}

export default Accordion;