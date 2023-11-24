import  axios  from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { DataContext } from './DataContextProvider'


export const AuthContext=createContext()
const AuthContextProvider = ({children}) => {
const[isAuth,setIsAuth]=useState(false)
const [user,setUser]=useState({})
const [id,setId]=useState(null)
const [loader,setLoader]=useState(false)
const token= localStorage.getItem("lamatoken")||""
const BASE_URL="https://zuraventures1.onrender.com/api/v1"
let userdata=JSON.parse(localStorage.getItem("lamauser"))||""
const {allProjects,setAllProjects,project,setProject,episodes,setEpisodes}=useContext(DataContext)



const authentication = async () => {
  try {
    // console.log(userdata,"inside")


    if (token !== "") {
      setIsAuth(true);
      setUser(userdata)
      await fetchProjects(token);
    } else {
      setIsAuth(false);
      
    }
  } catch (error) {
    console.log(error);
    setIsAuth(false);

  }
};




const fetchProjects = async (token) => {
  try {
    // console.log("fetching")
    let res = await axios.get(`${BASE_URL}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if(res?.data?.message!=="Projects not found"){
      // console.log("coming")
      res=await res.data.projects
      if(res.length!==0){
          await  setAllProjects((pre)=>[...res])  
      }
      
         setUser(JSON.parse(localStorage.getItem("lamauser")));
    }

  } catch (error) {
    console.log(error);
  }
};

useEffect(()=>{
authentication()

},[token])
// console.log(user,"authcontext")
// console.log(isAuth,"isAuth")
  return <AuthContext.Provider value={{id,loader,setLoader,setId,isAuth,setIsAuth,user,setUser}}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
