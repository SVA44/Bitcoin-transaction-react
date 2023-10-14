import * as React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from "@mui/material/IconButton";
import GitHubIcon from '@mui/icons-material/GitHub';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const footerStyle = {
  position: 'fixed',  // Fixed position
  bottom: 0,          // At the bottom
  width: '100%',      // Full width
};

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={footerStyle}>
        <Toolbar>
          <IconButton href="https://github.com/Slipperytaco/A1"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <GitHubIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <Button color="inherit" href = "mailto:104193108@student.swin.edu.au">Contact Us</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}