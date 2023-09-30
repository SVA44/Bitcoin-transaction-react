import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import TableauTable from './DataTable';
import WalletChart from './Wallet_Chart';
import Flow from './Node_Graph';

  
export default function ResponsiveGrid() {
    return (
        <div style={{ margin: '20px' }}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={6} md={6} >
                    <Paper elevation={10} 
                        style={{ padding: '30px', 
                            height: '50vh',
                            overflow: 'scroll' }}>
                    <Typography variant="h6"><b>Wallet Address:</b></Typography>
                    <Typography>
                        bc1q6v32wx37has40meqc9ea4tasc27umsksukylh2 <br></br> <br></br>
                        <b>Balance:</b> 3,827.73917861 BTC <br></br>
                        <b>Value in USD:</b> 98,772,116.75 USD <br></br>
                        <WalletChart/>
                    </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={6} md={6} >
                    <Paper elevation={10} 
                        style={{ padding: '30px', 
                            borderRadius: '30px', 
                            height: '50vh'}}>
                    <Typography variant="h6"><b>Visualization</b></Typography>
                    <Typography>
                        This area here visualize your transactions.
                        <Flow/>
                    </Typography>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={12} >
                    <Paper elevation={10}
                        style={{ padding: '30px', 
                            borderRadius: '30px', 
                            height: '35vh'}}>
                        <Typography>
                            <TableauTable/>
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}