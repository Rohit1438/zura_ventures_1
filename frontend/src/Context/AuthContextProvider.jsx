import  axios  from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { DataContext } from './DataContextProvider'


export const AuthContext=createContext()
const AuthContextProvider = ({children}) => {
const[isAuth,setIsAuth]=useState(false)
const [user,setUser]=useState({})
const [id,setId]=useState(null)
const [loader,setLoader]=useState(false)
const BASE_URL="http://localhost:8080/api/v1"
const token=localStorage.getItem("lamatoken")||""
const {allProjects,setAllProjects,project,setProject,episodes,setEpisodes}=useContext(DataContext)



const authentication = async () => {
  try {
    if (token !== "") {
      setIsAuth(true);
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
    console.log("fetching")
    let res = await axios.get(`${BASE_URL}/projects`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    
    res=await res.data.projects

    await  setAllProjects((pre)=>[...res])
    setUser(res.data.user);
  } catch (error) {
    console.log(error);

  }
};
useEffect(()=>{
authentication()

},[token])
console.log(isAuth,"isAuth")
  return <AuthContext.Provider value={{id,loader,setLoader,setId,isAuth,setIsAuth,user,setUser}}>{children}</AuthContext.Provider>
}

export default AuthContextProvider
