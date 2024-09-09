import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Hero = () => {


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        appendDots: dots => (
            <div style={{position:'absolute',bottom: '10px', width: '100%' }}>
              <ul style={{margin:'0px',padding:'0px'}}>{dots}</ul>
            </div>
          ),
          dotsClass: "slick-dots custom-dots",
      };


      const images = [
        "https://mac-center.com/cdn/shop/files/IMG-10942135_5921f7a6-0285-44f0-8788-1daa11c5419a.jpg?v=1723752285",
        "https://5.imimg.com/data5/SELLER/Default/2023/5/312229263/WS/LX/RZ/161643787/mi-108-cm-43-inches-5a-series-full-hd-smart-android-led-tv-1000x1000.jpg",
        "https://dlcdnwebimgs.asus.com/gain/29e7dcb9-33d7-4bfa-bdc5-97be601e379f/w800",
        "https://d2xamzlzrdbdbn.cloudfront.net/products/29670d9b-16c0-419a-83e1-72b0d90537e724181113.jpg",
      ];

  return (
    <div className='mt-28 flex flex-col m-5  sm:flex-row border border-gray-400'>
        <div className='w-full  sm:w-1/2 flex md:p-7 sm:p-5 lg:p-24 items-center justify-center py-0 sm:py-0'>
        <div className='text-gray-700   m-6 sm:m-3 md:m-5 lg:m-0 items-center text-center'>
            <div className='flex items-center  gap-2'>
                <p className='w-8 md:w-11 h-[2px] bg-[#414141]'> </p>
                <p className='font-medium text-sm md:text-base'>100% Authentic products</p>

            </div>
            <h1 className='text-3xl sm:py-3  lg:text-4xl leading-relaxed'>HYPER CHARGE YOUR SHOPPING !</h1>
            <div className='flex items-center mt-2 gap-2'>
                <p className='font-semibold text-sm  md:text-base'>HIGHLY RATED PRODUCTS</p>
                <p className='w-8 md:w-11  h-[2px] bg-[#414141]'> </p>



            </div>

        </div>
            
            </div>
            
            {/*div for slider*/}
            <div className='w-full sm:w-1/2'>
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className='justify-center'>
              <img src={img} alt={`Slide ${index + 1}`} className='w-full h-full object-cover' />
            </div>
          ))}
        </Slider>
      </div>            </div>
  )
}

export default Hero