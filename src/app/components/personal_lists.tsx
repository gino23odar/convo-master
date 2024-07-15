import {db} from '@/app/firebase/config'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import Accordion from './Accordion';
import exp from 'constants';


interface PersonalListsProps {
    data: any[];
}

// async function fetchDataFromFirestore(){
//     const querySnapshot = await getDocs(collection(db, 'users'))
//     const data: any[] = [];
//     querySnapshot.forEach((doc) => {
//         data.push({id: doc.id, ...doc.data()})
//     })
//     return data
// }

const PersonalLists: React.FC<PersonalListsProps> = ({data}) => {
    const [list, setList] = React.useState<string>('');
    const [entry, setEntry] = React.useState<string[]>([]);

    let topics = data.map((item) => item.topic);
    //console.log(topics);

    const handleTopic = (topic: string) => {
        setList(topic);
    }
    //console.log(list)

    const filterByTopic = (data: any[], topic: string) => {
        const filtered:string[] = data.filter((item) => item.topic === topic);
        setEntry(filtered);
    }

    //console.log(entry);

    useEffect(() => {
        filterByTopic(data, list);
    }, [list, data])

    return (
        <div>
            <div className='w-full px-4 overflow-auto'>
                { topics.map((val, index) => (
                    <button key={index} className='px-4 py-2 bg-blue-500 m-2 text-white rounded' onClick={()=>handleTopic(val)}>
                        {val}
                    </button>
                ))}
            </div>
            <div className='mr-4'>
                <Accordion entry={entry}/>
            </div>
            <div id="accordion-collapse" data-accordion="collapse">
                <h2 id="accordion-collapse-heading-1">
                    <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                    <span>What is Flowbite?</span>
                    <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                    </svg>
                    </button>
                </h2>
                <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
                    <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                        <p className="mb-2 text-gray-500 dark:text-gray-400">Flowbite is an open-source library of interactive components built on top of Tailwind CSS including buttons, dropdowns, modals, navbars, and more.</p>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalLists