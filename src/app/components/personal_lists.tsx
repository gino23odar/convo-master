import {db} from '@/app/firebase/config'
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'

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
                {data.map((user) => (
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
                ))}
            </div>
        </div>
    )
}