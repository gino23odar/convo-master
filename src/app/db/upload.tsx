'use client'
import React, { useEffect } from 'react';

import {db} from '@/app/firebase/config'
import { collection, addDoc } from 'firebase/firestore'

import SpecialButton from '@/app/components/specialButton'

interface UploadProps {
    uid: string;
    data: any[];
}

// check if the topic is at least 3 characters long
function checkTopic(topic: string){
    if(topic.length < 3){
        alert('Topic must be at least 3 characters long');
        return false;
    }
    return true;
}

async function handleUpload({uid, topic, question, answer}: {uid:string, topic: string, question: string, answer: string}) {
    if(!checkTopic(topic)){
        return false;
    }

    try{
        const docRef = await addDoc(collection(db, "users"), {
            uid: uid,
            topic: topic.toLowerCase(),
            question: question,
            answer: answer
        });
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch(e){
        console.error(e)
        return false;
    }
}

const Upload : React.FC<UploadProps> = ({uid, data}) => {
    const [topic, setTopic] = React.useState<string>('');
    const [answer, setAnswer] = React.useState<string>('');
    const [question, setQuestion] = React.useState<string>('');
    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [filteredQuestions, setFilteredQuestions] = React.useState<{ question: string }[]>([]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const added = await handleUpload({ uid, topic, question, answer });
        if(added){
            setTopic('');
            setAnswer('');
            setQuestion('');
            
            alert('Uploaded successfully');
        }
    }

    // get a list of unique topics
    let topics = Array.from(new Set(data.map((item) => item.topic.toLowerCase())));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setQuestion(e.target.value);
    };
    
    //const filteredQuestions = data.filter((item) => item.question.toLowerCase().includes(searchQuery.toLowerCase()));

    // filter questions by topic and search query
    const filterQuestions = (data: any[], topic:string, query: string) => {
        let filtered = data.filter((item) => item.topic.toLowerCase().includes(topic.toLowerCase()));
        const filteredQs = filtered.filter((item) => item.question.toLowerCase().includes(query.toLowerCase()));
        setFilteredQuestions(filteredQs);
    }

    // refactor to update 

    useEffect(() => {
        filterQuestions(data, topic, searchQuery);
    }, [data, searchQuery, topic])

    return(
        <div className='w-full p-2'>
            <form onSubmit={handleSubmit} className="max-w-screen-md mx-auto p-4 bg-white shadow-lg rounded">
                <div className=' mt-2'>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Topic</label>
                    <div className='flex pb-2 gap-2'>
                        <select value={topic} onChange={(e) => setTopic(e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ring-blue-400 focus:ring' required>
                            <option value='newTopic'>New Topic</option>
                            {topics.map((val, index) => (
                                <option key={index} value={val}>{val}</option>
                            ))}
                        </select>
                        { !topics.includes(topic) ? <input type="text" ref={null} placeholder='Enter New Topic' value={topic == 'newTopic'? '' : topic} onChange={(e) => setTopic(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ring-blue-400 focus:ring" /> : null }
                    </div>

                    <label htmlFor="question" className="block text-gray-700 text-sm font-bold mb-2">Question</label>
                    
                    <div className='mb-2'>
                        <input type='text' value={searchQuery} onChange={handleInputChange} placeholder="Questions..." className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ring-blue-400 focus:ring' required/>
                        <ul className='text-white absolute'>
                            {searchQuery.length > 1 && filteredQuestions.map((item, index) => (
                                <li key={index} className='bg-gray-500 opacity-75 last:rounded-b-lg'>{item.question}</li>
                            ))}
                        </ul>
                    </div>
                    <label htmlFor="answer" className="block text-gray-700 text-sm font-bold mb-2">Answer</label>
                    <textarea rows={3} id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ring-blue-400 focus:ring" required/>

                    <div className="text-center pt-2">
                        <SpecialButton text='Upload'/>
                    </div>
                </div>
            </form>

        </div>
    )

}

export default Upload;