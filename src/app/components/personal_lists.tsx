import React, { useEffect, useState } from 'react'
import Accordion from './Accordion';
import SpecialButton from './specialButton';

interface PersonalListsProps {
    data: any[];
}

const PersonalLists: React.FC<PersonalListsProps> = ({data}) => {
    const [list, setList] = React.useState<string>('help');
    const [entry, setEntry] = React.useState<string[]>([]);

    // filter out any duplicate topics
    let topics = Array.from(new Set(data.map((item) => item.topic)));

    const handleTopic = (topic: string) => {
        setList(topic);
    }

    const filterByTopic = (data: any[], topic: string) => {
        const filtered:string[] = data.filter((item) => item.topic === topic);
        setEntry(filtered);
    }

    useEffect(() => {
        filterByTopic(data, list);
    }, [list, data])

    return (
        <div>
            <div className='flex w-full px-4 overflow-auto'>
                { topics.map((val:string, index) => (
                    <div key={index} className='m-2' onClick={()=>handleTopic(val)}>
                        <SpecialButton text={val}/>
                    </div>
                ))}
            </div>
            <div className='mr-4 mt-1'>
                <Accordion entry={entry}/>
            </div>
        </div>
    )
}

export default PersonalLists