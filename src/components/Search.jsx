import React, { useEffect, useState } from 'react'
import{Box,IconButton, Stack, TextField, } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useNavigate } from 'react-router-dom'



const Search = () => {
    const [query, setQuery] = useState('')
    const [suggestion, setSuggestion] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        if (query.length>3){
            autoComplete(query)
        }else{
            setSuggestion([])
        }
        
    },[query])

    const autoComplete = async (search) => {
        try{
            console.log('working')
            const response = await fetch(`http://localhost:3000/autocomplete/search?q=${search}`)
            const data = await response.json()
            setSuggestion(data)
        }catch (err){
            console.log(err)
        }
    }
   


    const handleSearch = ()=>{
        if (query) {
            navigate(`/productlist?search=${query}`);
        }
    }






  return (
    <>
    <div>
<Box display={'flex'} className="bg-green-700 rounded-md mx-5">
<input
    type="text"
    className="bg-green-700 flex-shrink text-white placeholder-white rounded-xl px-2 py-2 focus:outline-none   max-w-60"
    placeholder="search products, brands..." 
    
    onChange={(e)=> setQuery(e.target.value)}/>
<IconButton onClick={handleSearch}>
    <SearchRoundedIcon className="text-white" />
</IconButton>

</Box> 
<div className="block absolute w-64 z-1 my-4  bg-white">
{
suggestion.map(item => <div className='text-black border-2 w-64 h-10 truncate' keys = {item._id}>
    {item.name}
    </div>)
}

</div>
</div>
  
  </>
 )
}

export default Search