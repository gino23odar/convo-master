'use client'
import Image from "next/image";
import React, { use, useEffect, useRef }  from "react";
import { useRouter } from "next/navigation";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/app/firebase/config";
import { getDocs, collection, query, where } from "firebase/firestore";
import { signOut } from "firebase/auth";

import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import Upload from "./db/upload";
import PersonalLists from "./components/personal_lists";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SelectionScreen from "./components/SelectionScreen";
import AIassistant from "./components/AIassistant";

import { helpTopic } from "@/app/constants";

async function fetchDataFromFirestore(uid: string) {
  const q = query(collection(db, 'users'), where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  const data: any[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  data.push(...helpTopic);
  return data;
}

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter()
  //fix this when data is defined
  const [data, setData] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const [showNav, setShowNav] = React.useState<boolean>(false);
  const [delayedShowNav, setDelayedShowNav] = React.useState<boolean>(false);

  const [showForm, setShowForm] = React.useState<boolean>(false);
  const [showAssist, setShowAssist] = React.useState<boolean>(false);

  const [showDelButton, setShowDelButton] = React.useState<boolean>(false);

  const UID : string | undefined = user?.uid!

  const handleClick = () => {
    setShowNav(!showNav);
  }

  // update the user session to render the page if the user is logged in
  useEffect(() => {
    const userSession = sessionStorage.getItem('user')
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

  // delay the showNav state to allow the menu to animate out before hiding it
  useEffect(() => {
    if (!showNav) {
      const timer = setTimeout(() => setDelayedShowNav(false), 150);
      return () => clearTimeout(timer);
    } else {
      setDelayedShowNav(true);
    }
  }, [showNav]);

  gsap.registerPlugin(useGSAP);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() =>{
    if(showForm){
      gsap.from(".formBox", { duration: 1,  x: -1000 });
    }

    if(showAssist){
      gsap.from(".formAssist", { duration: 1,  x: 1000 });
    }
    
  } , [showForm, showAssist]);
  
  return (
    <>
      {/* check if this wouldnt work in the navbar component  */}
      <AnimatePresence>
        {showNav && 
          <motion.div 
            className="flex flex-col p-2"
            key="modal"
            initial={{ y: -300 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            exit={{ y: -100, transition: { type:'spring', duration: 0.2 } }}
          >
            <Navbar showDelButton={showDelButton} setShowDelButton={setShowDelButton} /> 
            <div className="flex flex-col menu p-3 bg-white bg-opacity-10 rounded-bl-lg rounded-br-lg" onClick={handleClick}>
                <span></span>
                <span></span>
                <span></span>
              </div>
          </motion.div>
        } 
      </AnimatePresence>
        { !delayedShowNav &&  
          <motion.div 
            className="flex pt-2 pl-2"
            initial={{ y:-100, opacity:0 }}
            animate={{ y:0, opacity:1 }}
          >
            <div className="flex flex-col menu p-3 bg-white bg-opacity-10 rounded-md" onClick={handleClick}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className="flex flex-col items-center justify-between p-2 w-full">
            <li>
                <h1 className="text-xs sm:text-2xl font-bold text-white text-center break-words">Welcome {user?.displayName || user?.email}!</h1>
            </li>
            </ul>
          </motion.div>
        }
      
      <main className="flex flex-col w-full items-center px-2 pb-2">
        <div className="flex flex-col min-h-[45lvh] w-full bg-gradient-to-tl from-transparent to-slate-600 rounded-lg mt-2 h-100%">
          <h1 className="text-black font-bold text-2xl text-center bg-white rounded-lg m-2 h-100% justify- items-center"> Select your personal list:</h1>
          <div className="h-full">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <PersonalLists data={data} showDelButton={showDelButton} uid={UID}/>
            )}
          </div>
        </div>

        <div className="container flex w-full mt-2 rounded-lg  bg-gradient-to-tr from-slate-600 to-transparent items-center justify-center overflow-hidden" ref={container}>
          {!(showForm || showAssist) && <SelectionScreen setShowForm={setShowForm} setShowAssist={setShowAssist} />}
          {showForm && <div className="formBox"> <Upload uid={UID} data={data} /> </div>}
          {(showAssist || showForm) && <button onClick={() => {setShowForm(false); setShowAssist(false)}} className={`btn ${showForm ? 'filter-violet' : 'rotate-180 filter-neon'} `}>
            <Image 
              src='fastArrow.svg'
              alt='back'
              width={50}
              height={50}
            />
          </button>}
          {showAssist && <div className="formAssist"> <AIassistant /> </div>}
        </div>
      </main>
      <Footer />
    </>
    
  );
}
