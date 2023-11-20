import React from 'react'
import styled from "styled-components"
import image from "../Images/homepage1.png"
import { Link } from 'react-router-dom'
const Homepage = () => {
  return (
<Div>
    <div className='homeroute'>
<Link style={{color:"black",padding:"5px 20px",boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.06), 0.75032px 1.50064px 3.75159px 0px rgba(0, 0, 0, 0.06), 3.00127px 6.00254px 6.75286px 0px rgba(0, 0, 0, 0.05), 6.75286px 13.50572px 9.00381px 0px rgba(0, 0, 0, 0.03), 12.00508px 24.01017px 10.50445px 0px rgba(0, 0, 0, 0.01), 18.75794px 36.76557px 12.00508px 0px rgba(0, 0, 0, 0.00)",display:"flex",
alignItems:"center",justifyContent:"space-between",
borderRadius:"25px",}}>
<i class="fa-solid fa-house-user" ></i>
Back to Home</Link>
    </div>
    <div className='title'>
        <h1>
            Create New Project
        </h1>
    </div>
    <div className='homebanner'>
<img src={image} alt="" />
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in</p>
<button>
<i class="fa-regular fa-square-plus"></i> Create New Project
</button>
    </div>
</Div>
  )
}

export default Homepage
const Div=styled.div`
width: 70%;

.homeroute{
   margin-top:10px;

display: flex;
align-items: left;
font-size: 15px;

}
margin: auto;
    .title>h1{
        color: #7E22CE;
        font-size: 45px;
        font-weight: 600;
        margin: 10px;
    }
.homebanner{

width: 95%;
text-align: center;
    margin: auto;
}
p{
    color: #838383;
text-align: center;
margin: 20px;
font-family: Roboto;
font-size: 20px;
font-style: normal;
font-weight: 400;
line-height: normal;
}
.homebanner>img{
    width: 40%;
    margin:auto}
    button{
        border-radius: 12.89px;
background: #211935;
color: white;
font-size: 25px;
padding: 10px 30px;
margin: 10px;
    }
`
