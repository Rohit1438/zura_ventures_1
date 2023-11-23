import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
  } from '@chakra-ui/react'
  import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    FormHelperText,
  } from '@chakra-ui/react'
import React, { useContext, useState } from "react"
  import { Button, ButtonGroup } from '@chakra-ui/react'
  import { useDisclosure } from '@chakra-ui/react';
  import axios  from 'axios'
import { DataContext } from '../Context/DataContextProvider';

export default function AlertDialogExample() {
  const {allProjects,setAllProjects,project,setProject,episodes,setEpisodes}=useContext(DataContext)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user,setUser]=useState({})
    const cancelRef = React.useRef()
  const [projectName, setProjectName] = useState('');

  const BASE_URL="http://localhost:8080/api/v1"
  const token = localStorage.getItem("lamatoken") || "";
  const createProject=async()=>{
  try{
  let res=axios.post(`${BASE_URL}/projects/addprojects`,
  { title: projectName},
  { headers: { authorization: `Bearer ${token}` } }
  
  )
  fetchProjects(token)
  onClose();
  }catch(err){
      console.log(err);
  }
  }
  
  const handleCreate = () => {
    console.log('Project Name:', projectName);
    onClose();
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

  return (
    <>
      <Button
        onClick={onOpen}
        sx={{
      padding:"20px 30px"
        }}
        size='lg'
        

      >
        <i class="fa-regular fa-square-plus"></i> Create New Project
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        
      >
        <AlertDialogOverlay />

        <AlertDialogContent >
          <AlertDialogHeader>Create Project</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            <FormControl>
              <FormLabel>Enter project name</FormLabel>
              <Input
                type='text'
                onChange={(e) => setProjectName(e.target.value)}
              />
              <FormHelperText>Project name can't be empty</FormHelperText>
            </FormControl>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} colorScheme='red'>
              Cancel
            </Button>
            <Button
              colorScheme='green'
              sx={{ backgroundColor: '#7E22CE' }}
              ml={3}
              onClick={createProject}
            >
              Create
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}