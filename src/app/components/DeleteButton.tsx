import { doc, deleteDoc, getDocs, where, query, deleteField, updateDoc, collection, writeBatch } from "firebase/firestore";
import { db } from "@/app/firebase/config";

import Image from "next/image";
import { trash32 } from "../assets";

import Reveal from "@/app/utils/Reveal";

type DeleteButtonProps = {
    id: string;
    fieldName?: string;
    quest?: boolean;
}


// delete a document by id
async function deleteById(id: string, collectionName='users') {
    try{
        await deleteDoc(doc(db, collectionName, id));
        console.log('Document deleted successfully');
    } catch(e){
        console.error(e);
    }
}


// delete a list by topic
async function deleteDocumentsByUidAndTopic(uidVal:string, topicVal:string, collectionName='users'){
    try{
        const q = query(collection(db, collectionName), where("uid", "==", uidVal), where("topic", "==", topicVal));
        console.log(q);
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);

        const batch = writeBatch(db);

        querySnapshot.forEach((doc) => {
            console.log(doc.ref)
            batch.delete(doc.ref);
        });

        await batch.commit();

        console.log('Documents with uid: ${uidValue} and topic: ${topicValue} have been deleted successfully.');
    } catch(e){
        console.error(e);
    }
}


const DeleteButton: React.FC<DeleteButtonProps> = ({id, fieldName, quest=false}) => {
  return (
    <>
        {quest ? 
            
                <button onClick={() => deleteById(id)}>
                    <Image
                        src={trash32}
                        alt='delete button'
                    />
                </button>
            
            
            : 
            <button onClick={() => deleteDocumentsByUidAndTopic(id, fieldName!)}>
                <Image
                    src={trash32}
                    alt='delete button'
                />
            </button> 
        }
    </>
  )
}

export default DeleteButton