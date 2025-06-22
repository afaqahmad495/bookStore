import React from 'react';
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <>
    <div className='lg:h-[75vh] bg-zinc-900 text-white px-4 py-10 md:flex '>
      <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start md:justify-center  '>
      <h1 className='mb-4 lg:text-6xl text-4xl font-bold  text-yellow-100 md:text-left text-center  '>Discover Your Next Great read</h1>
      <p className='text-zinc-400 mt-4 lg:text-lg text-xl md:text-left text-center '>Uncover captivating stories, enriching knowledge, and endless inspiration in our curated collection of books</p>
      <div className='my-8 ' >
        <Link to="/all-books" className='bg-transparent border border-zinc-400 rounded-[50px] text-yellow-100 lg:mt-4 mb-4 py-2 px-6 text-xl font-semibold w-[60] hover:bg-zinc-700 transition-full duration-500 ' >Discover books</Link>
        </div>  
       
      </div>
      <div className=' lg:w-3/6  w-full h-auto lg:h-[100%] flex items-center justify-center    '>
      <img className='rounded shadow-lg  '  src="https://img.freepik.com/premium-vector/female-character-choosing-book-buy-bookstore-woman-standing-by-shelves-publication-different-literature-bestsellers-student-enjoying-reading-hobby-student-vector-flat-style_87689-2497.jpg?w=360" alt="" />
      </div>
      </div>
      </>
  )
}

export default Hero
