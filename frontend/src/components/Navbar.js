import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";

const Navbar = () => {
  return (
    <div style={{marginBottom:'4.3rem'}}>
      <AppBar >
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            aria-label="open drawer"
            edge="start"
          >
           
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 ,textAlign:'center'}}>
            Discussion Forum
          </Typography>
          <Button> New Question</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
