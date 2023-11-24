import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Projects from "../Pages/Projects";
import SinglePodcast from "../Pages/SinglePodcast";
import Login from "../Pages/Login";

import SignUp from "../Pages/SignUp";
import { PrivateRoute } from "./PrivateRoute";
import { DataContext } from "../Context/DataContextProvider";
import AccountPage from "../Pages/AccountPage";


export const AllRoutes = () => {
  const {allProjects,setAllProjects,project,setProject,episodes,setEpisodes}=useContext(DataContext)
  return (
    <Routes>
      <Route path="/" element={
      <PrivateRoute>

       <Homepage />    



       
      </PrivateRoute>
   
      
      } />
       <Route path="/login" element={<Login/>} />
       <Route path="/signup" element={<SignUp />} />
     
      {/* <Route path="/projects" element={
      <PrivateRoute>
    {  (allProjects.length==0)?<Homepage/>:  <Projects />  }   
      </PrivateRoute>
      } /> */}
      <Route path="/projects" element={
      <PrivateRoute>
     <Projects />  
      </PrivateRoute>
      } />

      <Route path="projects/:id" element={<SinglePodcast />} />
      <Route path="/projects/settings/:id" element={<AccountPage/>} />
      <Route path="*" element={<SinglePodcast />} />
      {/* <Route
        path="/admin"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route path="/watchlist" element={<SavedPage />} />
      <Route path="/movies/:id" element={<SingleProductsPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} /> */}
    </Routes>
  );
};
