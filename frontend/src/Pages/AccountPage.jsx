
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import logo1 from "../Images/logo1.png";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Components/Navbar";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { DataContext } from "../Context/DataContextProvider";
import { useParams } from "react-router-dom";
import AddEpisode from "../Utils/AddEpisodes";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@chakra-ui/react'
import { Textarea } from '@chakra-ui/react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  FormHelperText,
} from "@chakra-ui/react";
import image from "../Images/profileimage.png"
import { useDisclosure } from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContextProvider";
const BASE_URL="https://zuraventures1.onrender.com/api/v1"
const defaultLinkStyle = {
  textDecoration: "none",
  color: "#49454F",
  fontWeight: "600",
  fontSize: "15px",
  padding: "10px",
  borderRadius: "30px",
  letterSpacing: "1px",
};
const activeLinkStyle = {
  width: "100%",
  backgroundColor: "#E2D8EE",
  textDecoration: "none",
  color:"#49454F",
  fontWeight: "600",
  padding: "10px",
  borderRadius: "30px",
  fontSize: "15px",

};

const AccountPage = () => {
    const [isEditClicked, setIsEditClicked] = useState(false);
    const [episodeName, setEpisodeName] = useState("");
    const [ptojectTitle,setProjectTitle]=useState("")
    const [episodeDesc, setEpisodeDesc] = useState("");
    const [updateId,setUpdateId]=useState("")
    const { id } = useParams();
  //  const {user,setUser}= useContext(AuthContext)

   const data = [
      { name: "sample1", timne: 1 / 20 / 33, status: "Done" },
      { name: "sample1", timne: 1 / 20 / 33, status: "Done" },
      { name: "sample1", timne: 1 / 20 / 33, status: "Done" },
    ];
    const links = [
      // {
      //   to: `/projects`,
      //   label: "Projects",
      // },
      {
        to: `/projects/${id}`,
        label: "Edit trasncription",
      },
      {
        to: `/platform/${id}`,
        label: "Choose Platform",
      },
  
      {
        to: `/active/${id}`,
        label: "Active",
      },
    ];
  
    const token = localStorage.getItem("lamatoken") || "";
    const {
      allProjects,
      setAllProjects,
      project,
      setProject,
      episodes,
      setEpisodes,
    } = useContext(DataContext);

const {user,setUser}=useContext(AuthContext)
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    const cancelRef = React.useRef();
    const [projectName, setProjectName] = useState("");
  
console.log(user,"settings")
  

  
    return (
      
      <Div className="singlePodcastPage">
        <div className="sideBar">
          
          <div>
            <Link  to={"/projects"}>
           
          <div className="logobar">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="53"
              height="53"
              viewBox="0 0 53 53"
              fill="none"
            >
              <path
                d="M37.4727 46.8739L29.8109 43.043C27.6752 41.9862 25.1873 41.9862 23.0517 43.043L15.3678 46.8739C8.80679 50.1544 1.87148 43.087 5.3061 36.592L7.11149 33.2014C7.35367 32.7171 7.74998 32.3428 8.23435 32.1446L36.0857 19.617C37.2306 19.1106 38.5736 19.573 39.146 20.6738L47.5344 36.614C50.9691 43.087 44.0338 50.1544 37.4727 46.8739Z"
                fill="#7E22CE"
              />
              <path
                opacity="0.4"
                d="M34.3463 16.9309L16.1163 25.1432C14.0688 26.0679 11.9992 23.8662 13.056 21.8847L19.7491 9.181C22.5893 3.78687 30.2952 3.78687 33.1354 9.181L35.4912 13.6724C36.1076 14.8834 35.6013 16.3585 34.3463 16.9309Z"
                fill="#7E22CE"
              />
            </svg>
            <h1 id="logotext">LAMA</h1>
          </div>
          </Link>
            <p>Podcast Upload Flow</p>
            <div className="links">
            <NavLink to={"/projects"} style={{...activeLinkStyle,backgroundColor:"#7e22ce",color:"white"}}>Projects</NavLink>
              {links.map((el) => {
                return (
                  <NavLink
                    to={el.to}
                    style={({ isActive }) => {
                      return isActive ? activeLinkStyle : defaultLinkStyle;
                    }}
                  >
                    {el.label}
                  </NavLink>
                );
              })}
            </div>
          </div>
          <div style={{borderTop:"1px solid grey",padding:"15px 10px 10px 15px",fontSize:"20px"}}>
            <p> <i class="fa-solid fa-gear"></i> settings</p>
          </div>
        </div>
        <div className="rightBox">
        <div>
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href='/'><i class="fa-solid fa-house"></i></BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink isCurrentPage="true">Account Settings</BreadcrumbLink>
  </BreadcrumbItem>


</Breadcrumb>
</div>
<div className="pageTitle">
              <h1>Account Settings</h1>
            </div>
            <div className="profile">
              <img src={"https://cdn.pixabay.com/photo/2021/02/12/07/03/icon-6007530_640.png"} alt="profileimage" />
            <div className="label">
              <label htmlFor="">User Name</label>
            <input type="text"  defaultValue={user?user.name:"ss"}/>
            </div>
            <div className="label">
              <label htmlFor="">User Name</label>
            <input type="text"  defaultValue={user?user.email:""}/>
    </div>
            </div>
            <div  className="pageTitle">
              <h1 style={{fontSize:"40px"}}>Subcriptions</h1>
            </div>
            <div
              style={{
                backgroundColor: "#7E22CE",
                fontSize: "20px",
                padding: "15px 25px 15px",
                marginTop: "25px",
                textAlign: "left",
                alignItems: "center",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                borderRadius: "10px",
              }}
            >
              <p>You are currently on the Ques AI Basic Plan!</p>
              <button
                style={{
                  color: "#7E22CE",
                  fontWeight: "600",
                  borderRadius: "10px",
                  padding: "5px 20px 5px",
                  backgroundColor: "white",
                }}
              >
                Upgrade !
              </button>
            </div>

        </div>
      </Div>
      
    )
  };
  
  export default AccountPage;
  const Div = styled.div`
    display: grid;
    grid-template-columns: 22% 77%;
    .pageTitle > h1 {
      font-size: 40px;
      color: #7e22ce;
      font-weight: 600;
      text-align: left;
    }
    input{
      border: 2px solid #969696;
      color: black;
      padding: 5px 10px 5px;
      border-radius: 10px;
    }
    .label{
      display: flex;
      flex-direction: column;
      text-align: left;
    }
    label{
      font-weight:600;
      color: black;
    }
    .profile{
 
    display: grid;
    grid-template-columns: 20% 35% 40%;
    justify-content: space-evenly;
    align-items: center;
    padding: 20px 0px 20px;
    }
    .profile>img{
      width: 100%;
display: flex;
align-items: center;
margin: auto;
      border-radius: 100%;
    }
    table {
      width: 100%;
  
      border-radius: 15px;
    }
    tr {
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
        rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      /* border-bottom: 1px solid grey; */
      /* border-radius: 15px;  */
  
      color: black;
    }
    thead {
      border-radius: 15px 15px 20px 0px;
    }
    td {
      padding: 20px 35px 20px;
    }
    th {
      padding: 20px 35px 20px;
  
      border-radius: 15px 15px 20px 0px;
    }
    .projectsTable {
      /* border: 1px solid grey; */
      box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
        rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
      border-radius: 15px;
      margin-top: 20px;
    }
    svg {
      width: 40px;
    }
    .rightBox {
      width: 95%;
      padding: 50px;
      /* display: flex;
     flex-direction: column;
     align-items: center; */
    }
    .uploadOptionsCards {
      margin-top: 20px;
      display: flex;
      align-items: center;
      box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
      padding: 15px 20px 15px;
      border-radius: 15px;
      cursor: pointer;
    }
    .uploadOptions {
      font-size: 16px;
      font-weight: 400;
      color: black;
      width: 80%;
      display: flex;
      justify-content: space-between;
    }
    .sideBar {
      background-color: #f3e8ff;
      padding: 10px 20px 10px;
      display: flex;
      flex-direction: column;
  justify-content: space-between;
      font-size: 15px;
      text-align: left;
      color: #171717;
      height: 100vh;
      z-index: 10;
      position: sticky;
      top: 0px;
    }
    .links {
      display: flex;
      margin-top: 20px;
      flex-direction: column;
    }
  
    img {
      background: transparent;
    }
    .logobar {
      display: flex;
      align-items: center;
      color: #7e22ce;
      margin-top: 10px;
      margin-bottom: 15px;
    }
    #logotext {
      font-weight: 600;
      font-size: 35px;
    }
    .btn{
          border-radius: 5px;
  background: #211935;
  color: white;
  
  font-size: 20px;
  padding: 5px 20px;
  margin: 10px;
      }
    
  `;
  