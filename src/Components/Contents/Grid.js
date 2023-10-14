import React, { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import TableauTable from './DataTable';
import Flow from './Node_Graph';


export const WalletDetailsGridContext = React.createContext({
    props: []
}
)
export default function ResponsiveGrid(props) {
    
    /* Wallet Details Info */
    const [searchParams,] = useSearchParams();
    const walletAddress = searchParams.get('q');

    // Get the address balance from the database
    const [balance, setBalance] = useState([]);
    const getBalance = async () => {
        const { data } = await axios.get(`http://localhost:8000/getBalance?q=${searchParams.get('q')}`);
        setBalance(data);
    };
    useEffect(() => {
        getBalance();
    }, []);

    return (
        <div style={{ margin: '20px' }}>
            <Grid container spacing={2}>
                {/* 1st Grid for Wallet Details and Transactions Table */}
                <Grid item xs={12} sm={12} md={12}>
                    <Paper elevation={10} 
                        style={{ padding: '30px', 
                            height: '50vh',
                            overflow: 'scroll' }}>
                    <Typography variant="h6"><b>Wallet Address:</b></Typography>
                    <Typography>
                        {walletAddress} <br></br> <br></br>
                        <b>Balance:</b> {balance} <br></br> <br></br>
                        <Paper elevation={13}
                            style={{ padding: '30px',  
                                height: '35vh'}}>
                            <Typography>
                                <TableauTable/>
                            </Typography>
                        </Paper>
                    </Typography>
                    </Paper>
                </Grid>
                {/* 2nd Grid for Visualization */}
                <Grid item xs={12} sm={12} md={12} >
                    <Paper elevation={10} 
                        style={{ padding: '30px', 
                            height: '80vh'}}>
                    <Typography variant="h6"><b>Visualization</b></Typography>
                    <Typography>
                        This area here visualize your transactions.
                        <Flow/>
                    </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}