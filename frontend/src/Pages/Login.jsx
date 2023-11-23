import React, { useContext, useState } from "react";

import styled from "styled-components";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress, useToast } from "@chakra-ui/react";
import { AuthContext } from "../Context/AuthContextProvider";
const BASE_URL="http://localhost:8080/api/v1"
const Login = () => {
    const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user,setUser } = useContext(AuthContext);
  console.log(user,"userlogin")
  const toast = useToast();
  const handleLogin = async () => {

    try {
      setLoader(true);

      let res = await axios.post(`${BASE_URL}/user/login`, {
        email: email,
        password: password,
      });
  
      res = res.data;

      if (res.token) {
        console.log(res, "suer");
        await setUser((pre)=>res)
        setLoader(false);
        console.log(res.token);
        localStorage.setItem("lamatoken", res.token);
        localStorage.setItem("lamauser", JSON.stringify(res));
        toast({
          title: "Saved",
          description: "Login Succesfull",
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        console.log("coming infalied");
        setLoader(false);
        toast({
          title: "Something went wrong, ",
          description: `try again with correct email and 4 password`,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    } catch (err) {
      console.log(err.response);
      setLoader(false);

      if (err.response.data == "User not registered") {
        toast({
          title: "No user found",
          description: `Create a account first to proceed`,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      } else if (err.response.data == "Incorrect Password") {
        toast({
          title: "Password didnt matched",
          description: `use correct password to proceed`,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Login Unsuccessful",
          description: `Something went wrong, please try again with a proper email and 4 digit password`,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Div>
      <DIV>
        <h1>Log in now !!</h1>
        <h2>your inventory is waiting for you 🥳🥳</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button data-testid="user-login" onClick={handleLogin}>
          Log In
        </button>
        <br />
        <p className="p2" style={{fontSize:"15px"}}>
          Dont have an account? create now!!{" "}
          <Link className="Link" to={"/signup"}>
            Sign up{" "}
            {loader ? (
              <CircularProgress isIndeterminate color="green.300" />
            ) : (
              ""
            )}
          </Link>
        </p>
      </DIV>
    </Div>
  );
};

const Div = styled.div`
  height: 100vh;
  background-color: #7E22CE;
  display: flex;
  align-items: center;
`;
const DIV = styled.div`

  width: 400px;
  padding: 20px 0px 40px;
  margin:  auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border: 1px solid gray;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.332) 1.95px 1.95px 2.6px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  height: 60%;
  h1 {
    font-size: 2rem;
    font-weight: 800;
    text-align: left;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 400;
  }
  input {
    width: 80%;
    height: 30px;
    font-size: 16px;
    padding: 5px;

    font-weight: 200;
  }
  .Link {
    color: #6b21ff;
    font-weight: 800;
    font-size: 15px;
  }
  button {
    width: 150px;

    background-color: #6b21ff;
    color: white;
    font-weight: 800;
    font-size: 1.2rem;
    padding: 5px 20px;
    border-radius: 5px;
  }
  button:hover {
    width: 150px;
    color: white;

    background-color: #6b21ffa1;
    font-weight: 800;
    border: 2px solid #6b21ffb7;
    font-size: 1.2rem;
    padding: 5px 20px;
    border-radius: 5px;
  }
  .p2{
  font-size: 15px;
}
  @media (max-width: 600px) {
    width: 80%;
  }
`;

export default Login;
