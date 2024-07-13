'use client'
import React from 'react';

import {db} from '@/app/firebase/config'
import { collection, addDoc } from 'firebase/firestore'

interface UploadProps {
    uid: string;
  }

async function handleUpload({uid, topic, question, answer}: {uid:string, topic: string, question: string, answer: string}) {
    try{
        const docRef = await addDoc(collection(db, "users"), {
            uid: uid,
            topic: topic,
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

const Upload : React.FC<UploadProps> = ({uid}) => {
    const [topic, setTopic] = React.useState<string>('');
    const [answer, setAnswer] = React.useState<string>('');
    const [question, setQuestion] = React.useState<string>('');

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


    return(
        <div className='w-full p-2'>
            <form onSubmit={handleSubmit} className="max-w-screen-md mx-auto p-4 bg-white shadow-lg rounded">
                <div className=' mt-2'>
                    <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Topic</label>
                    <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ring-blue-400 focus:ring" /> 
                    <label htmlFor="question" className="block text-gray-700 text-sm font-bold mb-2">Question</label>
                    <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ring-blue-400 focus:ring" />
                    <label htmlFor="answer" className="block text-gray-700 text-sm font-bold mb-2">Answer</label>
                    <textarea rows={3} id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none ring-blue-400 focus:ring" />
                    <div className="text-center">
                        <button type='submit' className='bg-indigo-300 hover:bg-sky-600 text-white font-bold px-2 rounded-lg'>
                            Upload
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )

}

export default Upload;