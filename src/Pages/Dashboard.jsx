import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { Card } from '@mui/material'


const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user)
  const [data, setData] = useState(null)
  const [products, setproducts] = useState(null)
  const [listitem, setListitem] = useState('')
  const [listdata, setListdata] = useState(null)


  useEffect(() => {
    console.log(currentUser._id)
    const fetch = async (retries = 5, delay = 2000) => {

      try {
        const response = await axios.get(`https://newkartfrontend.vercel.app/analytics/data?sellerId=${currentUser._id}`)
        setData(response.data.orders)
        setproducts(response.data.products)
        console.log(response.data.orders,products,data)

      }catch(error){
        console.log(error)
        if (retries > 0) {
          setTimeout(() => fetch(retries - 1, delay), delay);
        }
      }   
  }
  fetch()
},[currentUser._id])


console.log(products,data)

const categories = products ? products.reduce((acc,product) => {
  const { category } = product
  if(!acc[category]) acc[category] = []
  acc[category].push(product)
  return acc
},{}) : {}

console.log(categories)

  return (
    <div>
    <div className='mt-16  flex  text-white text-lg gap-1  items-center justify-around rounded-md p-5 pt-8 '>
    <div className=' h-10 flex  items-center hover:bg-slate-700 justify-center  bg-gray-400 w-48 rounded-md '>
     <button onClick={() => {
        setListitem(prev => prev == 'Mobile' ? '' : 'Mobile') ,
        setListdata(categories.Mobile) 
    }

    } className='flex '> <p className=''>Mobile Inventory</p>
      <ExpandLessIcon style={{transform : listitem == 'Mobile' ? 'rotate(0deg)' : 'rotate(180deg)',
      transition: 'transform 0.3s ease',}} className='ml-1 mt-1'/>
      </button>

    </div>
    <div className='h-10  flex items-center hover:bg-slate-700 justify-center  bg-gray-400 w-48 rounded-md '>
    <button onClick={() => {
        setListitem(prev => prev == 'Laptop' ? '' : 'Laptop') ,
        setListdata(categories.Laptop) 
    }

    } className='flex '> <p className=''>Laptop Inventory</p>
      <ExpandLessIcon style={{transform : listitem == 'Laptop' ? 'rotate(0deg)' : 'rotate(180deg)',
      transition: 'transform 0.3s ease',}} className='ml-1 mt-1'/>
      </button>
    </div>
    <div className='h-10  flex items-center hover:bg-slate-700 justify-center  bg-gray-400 w-48 rounded-md '>
    <button onClick={() => {
        setListitem(prev => prev == 'Tablet' ? '' : 'Tablet') ,
        setListdata(categories.Tablet) 
    }

    } className='flex '> <p className=''>Tablet Inventory</p>
      <ExpandLessIcon style={{transform : listitem == 'Tablet' ? 'rotate(0deg)' : 'rotate(180deg)',
      transition: 'transform 0.3s ease',}} className='ml-1 mt-1'/>
      </button>    </div>
    <div className='h-10  flex items-center hover:bg-slate-700 justify-center  bg-gray-400 w-48 rounded-md '>
    <button onClick={() => {
        setListitem(prev => prev == 'Television' ? '' : 'Television') ,
        setListdata(categories.Television) 
    }

    }
    
    className='flex '> <p className=''>TV Inventory</p>
      <ExpandLessIcon style={{transform : listitem == 'Television' ? 'rotate(0deg)' : 'rotate(180deg)',
      transition: 'transform 0.3s ease',}} className='ml-1 mt-1'/>
      </button>    
      </div>
    </div>

    <div className=' flex flex-col gap-3'>
      {listdata && listitem && listdata.map(item => 
      <div className='flex justify h-36'>
        <Card elevation={1} className="flex flex-row items-center w-1/2 border border-gray-700 p-4 gap-4">
        <div className="w-[40%]  h-full">
                        <img src={item.images[0]} alt="" className="w-full h-full object-contain p-1" />
                      </div>
        <div>
      <p className='font-medium  rounded-xl    '>Name : {item.name}</p>
      <p className='  rounded-xl  text-lg font-bold text-red-700  '>Stock Remaining: {item.stock}</p>
      </div>
      </Card>
      </div>

      )}
    </div>



<p>iubbububububububhy</p>


    </div>

    
  )
}

export default Dashboard