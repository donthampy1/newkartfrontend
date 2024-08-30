import React, { useEffect, useState } from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useNavigate } from 'react-router-dom'



const Search = () => {
    const [query, setQuery] = useState('')
    const [suggestion, setSuggestion] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        if (query.length>0){
            autoComplete(query)
            console.log(suggestion)
        }else{
            setSuggestion([])
        }
        
    },[query])

    const autoComplete = async (search) => {
        try{
            console.log('working')
            const response = await fetch(`https://newkartbackend.onrender.com/autocomplete/search?q=${search}`)
            const data = await response.json()
            setSuggestion(data)
            console.log(suggestion)
        }catch (err){
            console.log(err)
        }
    }
   


    const handleSearch = ()=>{
        if (query) {
            navigate(`/productlist?search=${query}`);
            setSuggestion([])

        }
    }






  return (
    <>
    <div>
<div className="  lg:w-96 inline-flex items-center p-2 justify-center border border-gray-700 px-3  rounded-full">
    
<input
    type="text"
    className="flex-1 outline-none bg-inherit text-sm"
    placeholder="search..." 
    
    onChange={(e)=> setQuery(e.target.value)}/>
    <SearchRoundedIcon  type='submit' onClick={handleSearch} className="text-black" />


</div> 
<div className="absolute bg-gray-100  mt-5    gap-2    rounded-xl">
{
suggestion.map(item => <p className=' text-center font-normal p-2 rounded-xl hover:bg-gray-200 lg:w-96 w-64  truncate' keys = {item._id}>
    {item.name}
    </p>)
}

</div>
</div>
  
  </>
 )
}

export default Search




