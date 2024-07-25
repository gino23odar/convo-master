import React, { useEffect, useState } from 'react'
import Accordion from './Accordion';
import SpecialButton from './specialButton';
import Reveal from '@/app/utils/Reveal';
import DeleteButton from './DeleteButton';

interface PersonalListsProps {
    data: any[];
    showDelButton: boolean;
    uid: string;
}

const PersonalLists: React.FC<PersonalListsProps> = ({data, showDelButton, uid}) => {
    const [list, setList] = React.useState<string>('help');
    const [entry, setEntry] = React.useState<string[]>([]);

    // filter out any duplicate topics :: try to get topic with id of document
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
        <div className='h-full'>
            <Reveal>
                <div className='flex w-full px-4 overflow-auto'>
                    { topics.map((val, index) => (
                        <div key={index} className='flex items-center'>
                            <div className='ml-2' onClick={()=>handleTopic(val)}>
                                <SpecialButton text={val}/>
                            </div>
                            {showDelButton && <DeleteButton id={uid} fieldName={val}/>}
                        </div>
                    ))}
                </div>
            </Reveal>
            
            <div className='flex flex-row mr-4 mt-1 sm:min-h-96 items-center justify-center'>
                <Accordion entry={entry} showDelButton={showDelButton}/>
            </div>
        </div>
    )
}

export default PersonalLists