import React, { useEffect, useState, useRef } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'



const Search = () => {
    const [query, setQuery] = useState('')
    const [suggestion, setSuggestion] = useState([])
    const navigate = useNavigate()
    const searchRef = useRef(null)
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode)



    useEffect(()=>{

        if (query.length == 0 ){
            setSuggestion([])
        }


        if (query.length > 1 ){
            autoComplete(query)
            console.log(suggestion)
        }else{
            setSuggestion([])
        }
        
    },[query])
   

    const autoComplete = async (search) => {
        try{
            console.log('working')
            const response = await fetch(`https://newkartbackend-1.onrender.com/autocomplete/search?q=${search}`)
            const data = await response.json()
            setSuggestion(data)
            console.log(suggestion)
        }catch (err){
            console.log(err)
        }
    }
   


    const handleSearch = ()=>{
        if (query ){
            navigate(`/productlist?search=${query}`);
            setSuggestion([])
        }
        
    }

    const handleClickOutside = (event) => {
        if (searchRef.current && !searchRef.current.contains(event.target)) {
            setSuggestion([]);
        }
    };


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

  return (
    <>
    <div ref={searchRef} >
    <div className={`lg:w-96 w-44 md:w-64 sm:w-64 inline-flex items-center p-2 justify-center border rounded-full ${isDarkMode ? 'border-gray-700' : 'border-white'}`}>

<input
    type="text"
    className={`w-32 sm:w-52 md:w-52 lg:w-80 bg-inherit outline-none text-sm ${
        isDarkMode ? 'placeholder-gray-700' : 'placeholder-white'
      }`}
    placeholder="search..." 
    
    onChange={(e)=> setQuery(e.target.value)}/>
    <SearchRoundedIcon  type='submit' onClick={handleSearch}   className={`cursor-pointer ${isDarkMode ? 'text-gray-700' : 'text-white'}`}
    />


</div> 
<div className={`absolute mt-5 gap-2 rounded-xl ${isDarkMode ? 'bg-gray-100' : 'bg-gray-800'}`}>
{
suggestion.map(item => <p  onClick={() => {
    navigate(`/productlist?searchterm=${item.name}`);
    setSuggestion([]);  
  }}
   className='  font-normal p-2 rounded-xl hover:bg-gray-400 lg:w-96 w-64  truncate' key = {item._id}>
    {item.name}
    </p>)
}

</div>
</div>
  
</>
 )
}

export default Search




