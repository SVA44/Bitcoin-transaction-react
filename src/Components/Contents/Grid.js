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
export default function ResponsiveGrid({url}) {
    
    /* Wallet Details Info */
    const [searchParams,] = useSearchParams();

    // Get the wallet address from search params
    let walletAddress = searchParams.toString().slice(2)

    // Get the address balance from the database
    const [balance, setBalance] = useState([]);
    const getBalance = async () => {
        try{
            const { data } = await axios.get(`${url}/getBalance?q=${searchParams.get('q')}`);
            setBalance(data);
            console.log(data);
        } catch(error) {
            console.error("An error occurred:", error);
        }
        
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
                        <div style={{ paddingBottom: '30px'}}>{walletAddress}</div>
                        
                        <div style={{ paddingBottom: '30px'}}><b>Balance:</b> {balance} </div>

                        <Paper elevation={13}
                            style={{ paddingBottom: '120px',
                                height: '35vh'}}>
                            <Typography>
                                <Paper style={{ height: 50, marginBottom:0}}>
                                <TableauTable/>
                                </Paper>
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