import { doc, deleteDoc, getDocs, where, query, deleteField, updateDoc, collection, writeBatch } from "firebase/firestore";
import { db } from "@/app/firebase/config";

type DeleteButtonProps = {
    uid: string;
    fieldName?: string;
}

async function deleteById(id: string, collectionName='users') {
    try{
        await deleteDoc(doc(db, collectionName, id));
        console.log('Document deleted successfully');
    } catch(e){
        console.error(e);
    }
}


// delete an entry by 
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


const DeleteButton: React.FC<DeleteButtonProps> = ({uid, fieldName}) => {
  return (
    <>
        {fieldName ? 
            <button onClick={() => deleteDocumentsByUidAndTopic(uid, fieldName)}>
                {fieldName}
            </button> 
            : 
            <button onClick={() => deleteById(uid)}>
                DeleteButton 
            </button>
        }
    </>
  )
}

export default DeleteButton