import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from "react";

/* Columns definition*/
const columns = [
  { 
    field: 'id', 
    headerName: 'Block', 
    width: 100 , 
    cellClassName: 'super-app-theme--cell-block'
  },
  
  { 
    field: 'time', 
    headerName: 'Time',
    width: 400 
  },

  { 
    field: 'value', 
    headerName: 'Amount',
    width: 240,
    valueGetter: (params) =>{
      if(params.row.from_wallet){
        return "- " + params.row.value
      }
      return "+ " + params.row.value
    },
    cellClassName: (params) => {
      if(params.value == null){
        return '';
      }
      return clsx('super-app-amount',{
        negative: params.row.from_wallet == true,
        positive: params.row.from_wallet == false,
      }
      )
    } 
  },
  
  {
    field: 'gas',
    headerName: 'Gas',
    width: 150,
  },
  {
    field: 'gas_price',
    headerName: 'Gas Price',
    width: 150,
  },
];

export default function TableauTable(){

    // Get Search Terms
    const [searchParams,] = useSearchParams();

    // Get transactions data from the backend
    const [data, setData] = useState([]);
    const getData = async () => {
        const { data } = await axios.get(`http://localhost:8000/getTransactionsData?q=${searchParams.get('q')}`);
        setData(data);
    };
    useEffect(() => {
        getData();
    }, []);

    /* Tableau Table Data Rows */
    const rows = [];

    data.forEach((input) => {
    // Create a row object with the relevant data
    const row = {
      from_wallet: input[0]._nodes[0].address == searchParams.get('q'),
      id: input[0]._relationships[0].block_number,
      time: new Date(input[0]._relationships[0].timestamp * 1000),
      value: input[0]._relationships[0].value + " USD",
      gas: input[0]._relationships[0].gas,
      gas_price: input[0]._relationships[0].gas_price,
    };
    // Add the row object to the rows array
    rows.push(row);
    });
    return (
      <Box // Styles for value column
      sx={{ 
        height: 300,
        width: '100%',
        '& .super-app-theme--cell-block': {
          color: 'blue',
          fontWeight: '600',
        },
        '& .super-app-amount.negative': {
          color: 'red',
          fontWeight: '600',
        },
        '& .super-app-amount.positive': {
          color: 'green',
          fontWeight: '600',
        },
      }}
    > {/* Tableau Table */}
      <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
                pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                },
            }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        />
    </Box>
    )
}