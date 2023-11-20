import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import logo1 from "../Images/logo1.png";
import { NavLink, Link } from "react-router-dom";

const links = [
  { path: "/", title: "OEM" },
  { path: "/admin", title: "Admin" },
  // { path: "/watchlist", title: "Saved" }
  
];

const links2 = [
  { path: "/", title: "Home" },
  { path: "/admin", title: "Admin" },
  { path: "/login", title: "Signup / Register" }

  
  
]



const defaultLinkStyle = {
  // textDecoration: "none",
  // color: "#ffd58c",
  // fontSize: "20px",
  // letterSpacing: "1px",
  // fontWeight:"800"
};
const activeLinkStyle = {
  // width: "80px",
  // textDecoration: "none",
  // color: "white",
  // borderBottom: "4px solid gray",
  // borderRadius: "10px",
  // paddingBottom: "3px",
  // fontSize: "20px",
  // fontWeight: "bold",
  // letterSpacing: "1px",
  // margin: "auto"
};

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div
      style={{
        zIndex: 10,
        position: "sticky",
        width: "100%",
        top: "0px",
  
        
      
      }}
    >
      <Box bg={useColorModeValue("white")}  >
        <Flex h={20} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={10} padding={"20px opx 20px"}  alignItems={"center"}>
            <Link to={"/"}>
           

            <Box w="180px" h="70px" ml={10} padding="5px" style={{color:"#7E22CE",display:"flex",alignItems:"center"}}>
          <img src={logo1} alt="Logo" style={{ maxHeight: "90%", height: "auto" }} />
          <h2 style={{fontWeight:"600",fontSize:"25px"}}>LAMA</h2>
        </Box>

            </Link>
            <HStack
              as={"nav"}
              spacing={12}
              display={{ base: "none", md: "flex" }}
            >

            </HStack>
          </HStack>
          <Flex alignItems={"center"} mr={3} paddingRight={"40px"}>
            <Menu>

                <div style={{fontSize:"35px",}}>
                <button><i class="fa-solid fa-gear"></i></button>
                </div>
        

            </Menu>
          </Flex>
        </Flex>


      </Box>
    </div>
  );
};

export default Navbar;
