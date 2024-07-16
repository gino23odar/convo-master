import React, { useState, useEffect } from 'react'

// interface DataItem {
//     id: string;
//     question: string;
//     topic: string;
//     answer: string;
// }
  
// type GroupedData = {
//     [topic: string]: DataItem[];
// };

// remember to fix this when the data is defined
type AccordionProps = {
    entry: any[];
}

const Accordion: React.FC<AccordionProps> = ({ entry }) =>{
    const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

    // const groupByTopic = (list: DataItem[]) => {
    //     return list.reduce<GroupedData>((acc, item) => {
    //         (acc[item.topic] = acc[item.topic] || []).push(item);
    //         return acc;
    //     }, {})
    // }

    //const groupedData = groupByTopic(list);
    //console.log(groupedData);

    const handleToggle = (index: string) => {
        setActiveQuestion(activeQuestion === index ? null : index);
    }

    console.log(activeQuestion)

    useEffect(() => {
      setActiveQuestion(null)
    }, [entry])
    

    return(
        <div>
            {
                entry && Object.entries(entry).map(([index, entry]) => (
                    <button onClick={() => handleToggle(index)} key={index} tabIndex={0} className='first:rounded-t-xl last:rounded-b-xl flex items-center justify-between p-2  mx-2 w-full font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200  focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'>
                        <div className={`flex items-center justify-between w-full ${ activeQuestion === index ? 'box' : ''}`}>
                            <p className='font-bold sm:text-2xl flex-grow'>
                                {entry.question}
                            </p>
                            <svg data-accordion-icon className={`w-3 h-3 ml-2 shrink-0 transition-transform duration-500 ${ activeQuestion === index ? 'rotate-0' : 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                            </svg>
                        </div>
                        {activeQuestion === index && (
                            <div className={`p-2 w-full border border-b-0 rounded-xl mx-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 `}>
                                <p>{entry.answer}</p>
                            </div>
                        )}
                    </button>
                ))
            }
        </div>
    );
}

export default Accordion;