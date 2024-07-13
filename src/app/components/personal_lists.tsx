import {db} from '@/app/firebase/config'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import Accordion from './Accordion';

async function fetchDataFromFirestore(){
    const querySnapshot = await getDocs(collection(db, 'users'))
    const data: any[] = [];
    querySnapshot.forEach((doc) => {
        data.push({id: doc.id, ...doc.data()})
    })
    return data
}

export default function PersonalLists() {
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        async function fetchData(){
            const data = await fetchDataFromFirestore()
            setData(data)
        }
        fetchData()
    }, [])
    console.log(data)

    return (
        <div>
            <h1>Personal Lists</h1>
            <div>
                {/* {data.map((user) => (
                    <div key={user.id} className='mb-4'>
                        <p className='text-2xl font-bold'>
                            {user.topic}
                        </p>
                        <p className='text-xl'> 
                            {user.question}
                        </p>
                        <p className='text-xl'> 
                            {user.answer}
                        </p>
                    </div>
                ))} */}
                <Accordion data={data} />
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