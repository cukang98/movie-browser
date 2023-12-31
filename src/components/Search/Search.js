import React, { useState } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { searchMovie } from '../../features/createGenreOrCategory';
import '../global.css'
const Search = () => {
    const [query, setquery] = useState('')
    const dispatch = useDispatch();
    const location = useLocation()

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // console.log("shubham", query)
            dispatch(searchMovie(query));
        }
    }

    if (location.pathname !== '/') return null;

    return (
        <div className='search-container'>
            <TextField
                onKeyPress={handleKeyPress}
                value={query}
                variant="standard"
                onChange={(e) => setquery(e.target.value)}
                InputProps={{
                    className: "input",
                    startAdornment: (
                        <InputAdornment position='start'>
                            <SearchIcon />
                        </InputAdornment>
                    )
                }}
            />
        </div>
    )
}

export default Search;