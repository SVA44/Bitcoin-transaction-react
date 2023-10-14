import React from 'react';
import { useNavigate, createSearchParams, useSearchParams } from 'react-router-dom';
import { Button, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import Footer from '../Components/UI/Footer.js';


import '../Styling/Home.css';

const Home = () => {
    const navi = useNavigate();
    /* Change to Information page after search */
    const SubmitSearch = (event) => {
        const Searched = new FormData(event.target);
        navi(
            {
                pathname: 'information',
                search: createSearchParams(Object.fromEntries(Searched.entries())).toString()
            }
        );
    };
    const [searchParams,] = useSearchParams();

    return (
        <div class = "home">
            <div class = "home-page">
                <h1>TacoCorp</h1>
                <h4>Insights into the ever changing market...</h4>
                <form class = "home-search" onSubmit = {SubmitSearch}>
                    {/* search bar */}
                    <TextField placeholder='Enter Address'
                        fullWidth size = {"small"}
                        defaultValue = {searchParams.get("q")}
                        varriant = 'filled'
                        type = 'search'
                        InputProps={{ startAdornment: (
                            <InputAdornment position='start'>
                              <SearchIcon/>
                            </InputAdornment>
                        ) }}
                        name = 'q'
                    />
                    <br></br>
                    <Button variant='contained' type="submit">Search</Button>                    
                </form>
            </div>  
            <Footer/>
        </div>
    )
}

export default Home;