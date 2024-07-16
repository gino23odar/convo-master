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

    let topics = Array.from(new Set(data.map((item) => item.topic)));
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
            <div className='mr-4 mt-1'>
                <Accordion entry={entry}/>
            </div>
        </div>
    )
}

export default PersonalLists