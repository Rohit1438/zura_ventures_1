import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContextProvider'


export const DataContext=createContext()
const DataContextProvider = ({children}) => {
const [allProjects,setAllProjects]=useState([])
const[project,setProject]=useState([])
const [episodes,setEpisodes]=useState([])
// const {isAuth,setIsAuth}=useContext(AuthContext)
// console.log(isAuth,"isAuth")
  return <DataContext.Provider value={{allProjects,setAllProjects,project,setProject,episodes,setEpisodes}}>{children}</DataContext.Provider>
}

export default DataContextProvider
