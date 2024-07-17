'use client'
import Image from "next/image";
import React, { useEffect }  from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { getDocs, collection, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

import Upload from "./db/upload";
import PersonalLists from "./components/personal_lists";
import Navbar from "./components/Navbar";

async function fetchDataFromFirestore(uid: string) {
  const q = query(collection(db, 'users'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter()
  const [session, setSesssion] = React.useState<string | null>(null)
  //fix this when data is defined
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const UID : string | undefined = user?.uid!

  // update the user session to render the page if the user is logged in
  useEffect(() => {
    const userSession = sessionStorage.getItem('user')
    setSesssion(userSession);
    if(!user && !userSession){
      router.push('/sign-up')
    }
  }, [user, router])

  // fetch data from firestore for the authenticated user
  useEffect(() => {
    if (user) {
      fetchDataFromFirestore(UID)
        .then(fetchedData => {
          setData(fetchedData);
          setLoading(false);
        })
        .catch(error => {
          console.error("Error fetching data: ", error);
          setError("Failed to fetch data");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user,UID]);
  
  return (
    <main className="flex min-h-screen flex-col w-full items-center p-2">
      <Navbar text={user?.displayName || user?.email!} />
      <div className="flex flex-col min-h-[40lvh] w-full pt-2 bg-gradient-to-tl from-transparent to-slate-600 rounded-lg mt-2 h-100%">
        <h1 className="text-black font-bold text-2xl text-center bg-white rounded-lg m-2 h-100% justify- items-center"> Select your personal list:</h1>
        <div >
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <PersonalLists data={data} />
          )}
        </div>
      </div>

      <div className="flex w-full mt-2 p-2  rounded-lg h-100% bg-gradient-to-tr from-slate-600 to-transparent items-center justify-center">
        <Upload uid={UID} data={data} />
      </div>
    </main>
  );
}
