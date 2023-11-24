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
const SinglePodcast = () => {
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [episodeName, setEpisodeName] = useState("");
  const [ptojectTitle,setProjectTitle]=useState("")
  const [episodeDesc, setEpisodeDesc] = useState("");
  const [updateId,setUpdateId]=useState("")
  const { id } = useParams();
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const cancelRef = React.useRef();
  const [projectName, setProjectName] = useState("");
  const {user,setUser}= useContext(AuthContext)

  const handleCreate = () => {
    
    onClose();
  };


  const fetchEpisodes = async () => {
    try {
      let res = await axios.get(`${BASE_URL}/projects/episodes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
 console.log(res,"this is the thing")
      
 res = await res.data;

await setProjectName((pre)=>(res.projectName))
      if(res.message!=="Episodes not found for the project"){
        await setEpisodes((pre) => [...res.episodes]);
      }

      
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEpisodes();
  }, []);




  const uploadEpisode = async () => {
    try {
      let res = await axios.post(
        `${BASE_URL}/projects/addEpisode/${id}`,
        { title: episodeName, description: episodeDesc },
        { headers: { authorization: `Bearer ${token}` } }
      );
  
  
      await fetchEpisodes()
      await onClose()
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  
  const deleteEpisodes = async (episodeId) => {
    try {
      let res = await axios.delete(`${BASE_URL}/projects/deleteEpisode/${episodeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res,"deletresult")

      if(res.data.message=="Episode deleted successfully"){
        console.log("fetching after deleting")
        await fetchEpisodes()
      }
  
      let updatedEpisodes=await episodes.filter((el)=>{
        console.log(el)
        return (el._id!==episodeId)})
      // await  setEpisodes((pre)=>updateEpisodes)
      // console.log(updatedEpisodes,"updated")
      // console.log(res,"deleteres");
      
    } catch (error) {
      console.log(error);
    }
  };
console.log(episodes,"episdoes data and length",episodes.length)




  const updateEpisodes = async (episodeId) => {
    try {
      let res = await axios.put(`${BASE_URL}/projects/updateEpisode/${episodeId}`,
      { title: episodeName, description: episodeDesc },
      { headers: { authorization: `Bearer ${token}` } }
      );
      await fetchEpisodes()
      setIsEditClicked((pre)=>false)

      return res;
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchEpisodes();
  }, []);

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
          <Link to={`/projects/settings/:${id}`}><p> <i class="fa-solid fa-gear"></i> settings</p></Link>
          
        </div>
      </div>
      <div className="rightBox">
        {/* <Navbar /> */}
<div>

</div>



        {isEditClicked ? (
          <div>
            <div>
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href='/'><i class="fa-solid fa-house"></i></BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink >{projectName}</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink >Transcript</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
</div>
            <div className="pageTitle" style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <h1>Edit Transcript</h1>
              <div className="editbtns">
<button className="btn" style={{background:"#fff2f6",border:"3px solid red",color:"red",alignContent:"center"}} onClick={()=>setIsEditClicked((pre)=>false)}>
Discard
</button>
<button className="btn" onClick={()=>updateEpisodes(updateId)}>
Save & Exit
</button>
              </div>
            </div>

            <div className="transcriptArea">
            <Textarea
            sx={{border:"4px solid #7E22CE",height:"60vh",borderRadius:"15px",height:"60vh"}}
        value={episodeDesc}
        onChange={(e)=>setEpisodeDesc((pre)=>e.target.value)}
    
        size='lg'
      />
            </div>

            {/* <div
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
              <p>All files are processed! Your widget is ready to go!</p>
              <button
                style={{
                  color: "#7E22CE",
                  fontWeight: "600",
                  borderRadius: "10px",
                  padding: "5px 20px 5px",
                  backgroundColor: "white",
                }}
              >
                Try it out!
              </button>
            </div> */}

            {/* table */}
            {/* <div className="projectsTable">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Upload Date & Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {episodes?.map((el) => (
                    <tr>
                      <td>{el.title}</td>
                      <td>{el.lastUpdated}</td>
                      <td>Done</td>
                      <td>
                        <ButtonGroup size="sm" isAttached variant="outline">
                          <Button>Edit</Button>
                          <Button>Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div> */}
          </div>
        ) : (

          //condition changing
          <div>
            <div>
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href='/'><i class="fa-solid fa-house"></i></BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem>
    <BreadcrumbLink >{projectName}</BreadcrumbLink>
  </BreadcrumbItem>

  <BreadcrumbItem isCurrentPage>
    <BreadcrumbLink >upload</BreadcrumbLink>
  </BreadcrumbItem>
</Breadcrumb>
</div>
            <div className="pageTitle">
              <h1>{projectName}</h1>
            </div>

            <div className="uploadOptions">
              <div className="uploadOptionsCards" onClick={onOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="62"
                  height="61"
                  viewBox="0 0 62 61"
                  fill="none"
                >
                  <path
                    d="M30.9209 60.3652C47.6087 60.3652 61.1367 47.0453 61.1367 30.6143C61.1367 14.1832 47.6087 0.863281 30.9209 0.863281C14.2332 0.863281 0.705078 14.1832 0.705078 30.6143C0.705078 47.0453 14.2332 60.3652 30.9209 60.3652Z"
                    fill="#DA0000"
                  />
                  <path
                    d="M50.2191 21.0676C49.9908 20.2212 49.5393 19.4492 48.9104 18.83C48.2815 18.2108 47.4975 17.7663 46.6379 17.5415C43.5179 16.7305 30.9212 16.7305 30.9212 16.7305C30.9212 16.7305 18.3201 16.7305 15.1777 17.5591C14.3222 17.7873 13.5428 18.2333 12.9181 18.8523C12.2934 19.4713 11.8453 20.2415 11.6189 21.0852C10.7773 24.1705 10.7773 30.6319 10.7773 30.6319C10.7773 30.6319 10.7773 37.0846 11.6189 40.1787C11.8453 41.0224 12.2934 41.7926 12.9181 42.4116C13.5428 43.0306 14.3222 43.4766 15.1777 43.7047C18.3112 44.5334 30.9212 44.5334 30.9212 44.5334C30.9212 44.5334 43.5179 44.5334 46.6603 43.7047C47.5199 43.48 48.3039 43.0355 48.9328 42.4162C49.5617 41.797 50.0132 41.0251 50.2414 40.1787C51.0875 37.0934 51.0875 30.6319 51.0875 30.6319C51.0875 30.6319 51.0651 24.1617 50.2191 21.0676ZM26.8925 36.5645V24.6641L37.3538 30.6143L26.8925 36.5645Z"
                    fill="white"
                  />
                </svg>
                <div style={{ textAlign: "left", padding: "0px 20px 0px" }}>
                  <p>Upload</p>
                  <p>Youtube Video</p>
                </div>
              </div>
              <div className="uploadOptionsCards" onClick={onOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="61"
                  height="61"
                  viewBox="0 0 61 61"
                  fill="none"
                >
                  <path
                    d="M30.417 0.143921C24.4409 0.143921 18.599 1.91605 13.63 5.23621C8.66103 8.55637 4.78819 13.2754 2.50123 18.7966C0.214264 24.3179 -0.38411 30.3933 0.781774 36.2546C1.94766 42.1159 4.82544 47.4998 9.05119 51.7256C13.277 55.9513 18.6609 58.8291 24.5222 59.995C30.3835 61.1609 36.4589 60.5625 41.9801 58.2755C47.5013 55.9886 52.2204 52.1157 55.5405 47.1468C58.8607 42.1778 60.6328 36.3359 60.6328 30.3597C60.6328 22.346 57.4494 14.6605 51.7828 8.99393C46.1163 3.32737 38.4307 0.143921 30.417 0.143921ZM44.2939 43.7263C44.0327 44.1524 43.6132 44.4576 43.1274 44.575C42.6416 44.6925 42.1291 44.6127 41.7021 44.353C34.6069 40.0154 25.6765 39.035 15.1569 41.4389C14.6801 41.524 14.1888 41.4224 13.785 41.155C13.3812 40.8875 13.0958 40.4749 12.9881 40.0027C12.8804 39.5305 12.9587 39.0349 13.2066 38.6189C13.4546 38.2028 13.8532 37.8982 14.3198 37.7682C25.8287 35.1361 35.7037 36.2686 43.6672 41.1345C44.0903 41.3986 44.3918 41.8194 44.5058 42.3049C44.6199 42.7905 44.5372 43.3014 44.276 43.7263H44.2939ZM47.9914 35.4942C47.6645 36.0268 47.1397 36.408 46.5321 36.554C45.9244 36.7 45.2837 36.599 44.7505 36.2731C36.6303 31.2819 24.2485 29.836 14.6421 32.7501C14.0443 32.9318 13.3989 32.8685 12.8478 32.5743C12.2967 32.2801 11.885 31.7789 11.7033 31.1812C11.5217 30.5834 11.585 29.938 11.8792 29.3868C12.1734 28.8357 12.6746 28.424 13.2723 28.2424C24.244 24.9119 37.8926 26.5279 47.2125 32.2712C47.7391 32.5992 48.1146 33.1221 48.2572 33.7259C48.3997 34.3297 48.2978 34.9653 47.9735 35.4942H47.9914ZM48.3092 26.9308C38.5507 21.1428 22.4848 20.6146 13.1828 23.4347C12.8266 23.5423 12.4526 23.5787 12.0823 23.5417C11.712 23.5048 11.3527 23.3953 11.0247 23.2194C10.3623 22.8643 9.86817 22.2607 9.6509 21.5412C9.54333 21.185 9.50697 20.811 9.54391 20.4407C9.58085 20.0704 9.69036 19.7111 9.86619 19.3831C10.042 19.0551 10.2807 18.765 10.5687 18.5293C10.8566 18.2936 11.1882 18.1169 11.5444 18.0093C22.2207 14.7684 39.9607 15.3951 51.1742 22.0381C51.4934 22.2274 51.7722 22.4777 51.9946 22.7747C52.2171 23.0717 52.3789 23.4097 52.4707 23.7692C52.5626 24.1288 52.5827 24.5029 52.53 24.8703C52.4773 25.2376 52.3527 25.591 52.1634 25.9102C51.9742 26.2294 51.7239 26.5082 51.4268 26.7306C51.1298 26.9531 50.7918 27.1149 50.4323 27.2068C50.0727 27.2986 49.6986 27.3188 49.3313 27.266C48.9639 27.2133 48.6105 27.0888 48.2913 26.8995L48.3092 26.9308Z"
                    fill="#7BD568"
                  />
                  <path
                    d="M44.2758 43.7265C44.0146 44.1525 43.5951 44.4577 43.1094 44.5752C42.6236 44.6926 42.111 44.6128 41.684 44.3532C34.5889 40.0155 25.6584 39.0352 15.1388 41.439C14.662 41.5242 14.1707 41.4225 13.7669 41.1551C13.3631 40.8877 13.0777 40.475 12.97 40.0028C12.8623 39.5306 12.9406 39.035 13.1886 38.619C13.4365 38.2029 13.8352 37.8983 14.3017 37.7683C25.8106 35.1362 35.6856 36.2687 43.6491 41.1346C44.0752 41.3959 44.3804 41.8153 44.4979 42.3011C44.6153 42.7869 44.5355 43.2994 44.2758 43.7265Z"
                    fill="#010201"
                  />
                  <path
                    d="M47.9733 35.4943C47.6465 36.0269 47.1216 36.4081 46.514 36.5541C45.9064 36.7002 45.2656 36.5991 44.7324 36.2732C36.6122 31.282 24.2304 29.8361 14.624 32.7503C14.0263 32.9319 13.3808 32.8687 12.8297 32.5744C12.2786 32.2802 11.8669 31.7791 11.6853 31.1813C11.5036 30.5835 11.5669 29.9381 11.8611 29.387C12.1554 28.8358 12.6565 28.4242 13.2542 28.2425C24.2259 24.9121 37.8745 26.5281 47.1945 32.2713C47.724 32.5964 48.1032 33.118 48.2492 33.722C48.3952 34.326 48.296 34.9633 47.9733 35.4943Z"
                    fill="#010201"
                  />
                  <path
                    d="M48.2912 26.931C38.5505 21.143 22.4847 20.6147 13.1827 23.4349C12.8264 23.5425 12.4525 23.5788 12.0822 23.5419C11.7119 23.5049 11.3525 23.3954 11.0246 23.2196C10.3622 22.8645 9.86804 22.2608 9.65078 21.5414C9.5432 21.1851 9.50684 20.8112 9.54378 20.4409C9.58072 20.0706 9.69023 19.7112 9.86606 19.3833C10.0419 19.0553 10.2806 18.7652 10.5685 18.5294C10.8565 18.2937 11.1881 18.117 11.5443 18.0095C22.2206 14.7685 39.9606 15.3952 51.174 22.0382C51.4932 22.2275 51.772 22.4778 51.9945 22.7749C52.217 23.0719 52.3787 23.4098 52.4706 23.7694C52.5625 24.129 52.5826 24.5031 52.5299 24.8704C52.4772 25.2378 52.3526 25.5911 52.1633 25.9103C51.974 26.2295 51.7237 26.5083 51.4267 26.7308C51.1297 26.9533 50.7917 27.1151 50.4322 27.2069C50.0726 27.2988 49.6985 27.3189 49.3311 27.2662C48.9638 27.2135 48.6104 27.0889 48.2912 26.8996V26.931Z"
                    fill="#010201"
                  />
                </svg>
                <div style={{ textAlign: "left", padding: "0px 20px 0px" }}>
                  <p>Upload</p>
                  <p>Spotify Video</p>
                </div>
              </div>
              {/* <AddEpisode/> */}
              <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
              >
                <AlertDialogOverlay />

                <AlertDialogContent>
                  <AlertDialogHeader>Upload your episode</AlertDialogHeader>
                  <AlertDialogCloseButton />
                  <AlertDialogBody>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        name="title"
                        onChange={(e) => setEpisodeName(e.target.value)}
                      />
                      <FormLabel>Description</FormLabel>
                      <Input
                        type="text"
                        name="description"
                        onChange={(e) => setEpisodeDesc(e.target.value)}
                      />
                      {/* <FormHelperText>Project name can't be empty</FormHelperText> */}
                    </FormControl>
                  </AlertDialogBody>
                  <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose} colorScheme="red">
                      Cancel
                    </Button>
                    <Button
                      colorScheme="green"
                      sx={{ backgroundColor: "#7E22CE" }}
                      ml={3}
                      onClick={uploadEpisode}
                    >
                      Upload
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <div className="uploadOptionsCards" onClick={onOpen}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="62"
                  height="61"
                  viewBox="0 0 62 61"
                  fill="none"
                >
                  <circle
                    cx="30.9136"
                    cy="30.6403"
                    r="30.2158"
                    fill="#D9D9D9"
                  />
                </svg>
                <div style={{ textAlign: "left", padding: "0px 20px 0px" }}>
                  <p>Upload Media</p>
                  <p>or Text File</p>
                </div>
              </div>
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
              <p>All files are processed! Your widget is ready to go!</p>
              <button
                style={{
                  color: "#7E22CE",
                  fontWeight: "600",
                  borderRadius: "10px",
                  padding: "5px 20px 5px",
                  backgroundColor: "white",
                }}
              >
                Try it out!
              </button>
            </div>

            {/* table */}
            <div className="projectsTable">



            {episodes.length!==0?

              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Upload Date & Time</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {episodes?.map((el) => (
                    <tr key={el._id}>
                      <td>{el.title}</td>
                      <td>{new Date(el.lastUpdated).toLocaleString()}</td>
                      <td>Done</td>
                      <td>
                        <ButtonGroup size="sm" isAttached variant="outline">
                          <Button color='whatsapp'
                            onClick={() => {
                              setEpisodeName((pre)=>el.title)
                              setEpisodeDesc((pre)=>el.description)
                              setUpdateId((pre)=>el._id)
                              setIsEditClicked((pre) => true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button color='red' onClick={()=>{deleteEpisodes(el._id)}}>Delete</Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
:
<div  style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"20px"}}>
<h2>
  No episodes found .
</h2>
 <div  style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center"}} onClick={onOpen}>
 <svg style={{width:"210px"}} xmlns="http://www.w3.org/2000/svg" width="128" height="129" viewBox="0 0 128 129" fill="none">
  <path d="M103.2 54.4666C99.5733 36.0666 83.4133 22.2533 64 22.2533C48.5867 22.2533 35.2 31 28.5333 43.8C12.48 45.5066 0 59.1066 0 75.5866C0 93.24 14.3467 107.587 32 107.587H101.333C116.053 107.587 128 95.64 128 80.92C128 66.84 117.067 55.4266 103.2 54.4666ZM101.333 96.92H32C20.2133 96.92 10.6667 87.3733 10.6667 75.5866C10.6667 64.6533 18.8267 55.5333 29.6533 54.4133L35.36 53.8266L38.0267 48.76C43.0933 39 53.0133 32.92 64 32.92C77.9733 32.92 90.0267 42.84 92.7467 56.5466L94.3467 64.5466L102.507 65.1333C110.827 65.6666 117.333 72.6533 117.333 80.92C117.333 89.72 110.133 96.92 101.333 96.92ZM42.6667 70.2533H56.2667V86.2533H71.7333V70.2533H85.3333L64 48.92L42.6667 70.2533Z" fill="#7E22CE"/>
</svg>
 <div style={{ textAlign: "left", padding: "0px 20px 0px" ,fontSize:"15px",textAlign:"center"}}>
   <p>Select a file or drag and drop here (Podcast Media or Transcription Text)</p>
   <p>MP4, MOV, MP3, WAV, PDF, DOCX or TXT file </p>
 </div>
</div>
</div>
}


            </div>
          </div>
        )}
      </div>
    </Div>
    
  )
};

export default SinglePodcast;
const Div = styled.div`
  display: grid;
  grid-template-columns: 22% 77%;
  .pageTitle > h1 {
    font-size: 50px;
    color: #7e22ce;
    font-weight: 600;
    text-align: left;
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
