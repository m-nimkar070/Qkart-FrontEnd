import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Avatar, Button, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import {useHistory} from "react-router-dom"
import "./Header.css";

const Header = ({ children, hasHiddenAuthButtons }) => {
  const history = useHistory();
  
  const handleExplore = () => {
    history.push("/")
  }

  const logout = () =>{
    history.push('/')
    localStorage.clear();
    window.location.reload();
  }

  const login =() =>{
    history.push("/login")
  }
  const register =() =>{
    history.push('/register')
  }


  return (
    <Box className="header">
      <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
      </Box>
      {children}
      {hasHiddenAuthButtons===1 && (
      <Button
        className="explore-button"
        startIcon={<ArrowBackIcon />}
        variant="text"
        onClick= {handleExplore}
      >
        Back to explore
      </Button>)}

      {!localStorage.getItem("username") && !hasHiddenAuthButtons && (
      <div>
        <Button  className="explore-button" onClick= {login}>
          LOGIN
        </Button>
        <Button  className="explore-button" onClick= {register} >
          REGISTER
        </Button>
      </div>
    )}
    {localStorage.getItem("username") && !hasHiddenAuthButtons && (
      <div>
        <Stack direction="row" spacing={2} alignItems="center">
          
          <Avatar alt={localStorage.getItem("username")} src="/public/avatar.png"  />
          <label className="name">{localStorage.getItem("username")}</label>
          <Button  className="explore-button" onClick={logout}>
            LOGOUT
          </Button>
        </Stack>
      </div>
    )}

    
    </Box>
  );
};

export default Header;
