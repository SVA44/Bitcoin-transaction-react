// Footer.js or Footer.tsx
import React from 'react';
import { makeStyles, Paper, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2),
    marginTop: 'auto', // This pushes the footer to the bottom
    backgroundColor: theme.palette.primary.main, // Customize the background color
    color: theme.palette.primary.contrastText, // Customize the text color
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Paper component="footer" className={classes.footer}>
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} Your Company Name
      </Typography>
    </Paper>
  );
};

export default Footer;
